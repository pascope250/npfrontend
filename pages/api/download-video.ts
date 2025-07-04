import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { m3u8Url, movieName, isWixMP } = req.query;

  if (!m3u8Url || typeof m3u8Url !== 'string') {
    return res.status(400).json({ error: 'Missing m3u8Url parameter' });
  }

  try {
    // Handle WixMP videos as direct downloads
    if (isWixMP === 'true') {
      const videoResponse = await fetch(m3u8Url);
      if (!videoResponse.ok) {
        throw new Error(`Failed to fetch video: ${videoResponse.statusText}`);
      }

      const safeMovieName = typeof movieName === 'string' ? movieName : 
                          Array.isArray(movieName) ? movieName[0] : 'video';
      const filename = `${encodeURIComponent(safeMovieName)}.mp4`;

      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Type', 'video/mp4');

      if (videoResponse.body) {
        await new Promise((resolve, reject) => {
          videoResponse.body!.pipe(res);
          videoResponse.body!.on('end', resolve);
          videoResponse.body!.on('error', reject);
        });
      } else {
        throw new Error('No response body from video source');
      }
      return;
    }

    // Original HLS handling remains unchanged
    const playlistResponse = await fetch(m3u8Url);
    if (!playlistResponse.ok) {
      throw new Error(`Failed to fetch playlist: ${playlistResponse.statusText}`);
    }
    
    const playlistText = await playlistResponse.text();
    const lines = playlistText.split('\n');
    const segmentUrls: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF:')) {
        if (i + 1 < lines.length && lines[i + 1].trim() !== '' && !lines[i + 1].startsWith('#')) {
          const segmentUrl = lines[i + 1].trim();
          try {
            segmentUrls.push(new URL(segmentUrl, m3u8Url).href);
          } catch {
            segmentUrls.push(segmentUrl);
          }
        }
      }
    }

    if (segmentUrls.length === 0) {
      throw new Error('No segments found in playlist');
    }

    const safeMovieName = typeof movieName === 'string' ? movieName : 
                         Array.isArray(movieName) ? movieName[0] : 'video';
    const filename = `${encodeURIComponent(safeMovieName)}.mp4`;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Transfer-Encoding', 'chunked');

    for (const segmentUrl of segmentUrls) {
      try {
        const segmentResponse = await fetch(segmentUrl);
        if (!segmentResponse.ok) {
          console.warn(`Skipping segment (${segmentResponse.status}): ${segmentUrl}`);
          continue;
        }
        
        await new Promise((resolve, reject) => {
          if (segmentResponse.body) {
            segmentResponse.body.pipe(res, { end: false });
            segmentResponse.body.on('end', resolve);
            segmentResponse.body.on('error', reject);
          } else {
            reject(new Error('Empty segment body'));
          }
        });
      } catch (segmentError) {
        console.error(`Segment error (${segmentUrl}):`, segmentError);
      }
    }

    res.end();
  } catch (error) {
    console.error('Download failed:', error);
    res.status(500).json({ 
      error: 'Download failed',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}