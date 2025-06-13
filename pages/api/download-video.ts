import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { m3u8Url, movieName } = req.query;

  if (!m3u8Url || typeof m3u8Url !== 'string') {
    return res.status(400).json({ error: 'Missing m3u8Url parameter' });
  }

  try {
    // 1. Fetch the m3u8 playlist
    const playlistResponse = await fetch(m3u8Url);
    if (!playlistResponse.ok) {
      throw new Error(`Failed to fetch playlist: ${playlistResponse.statusText}`);
    }
    const playlistText = await playlistResponse.text();

    // 2. Parse segments - now looking for any line after #EXTINF that's a URL
    const lines = playlistText.split('\n');
    const segmentUrls: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF:')) {
        // The next line should be the segment URL
        if (i + 1 < lines.length && lines[i + 1].trim() !== '' && !lines[i + 1].startsWith('#')) {
          const segmentUrl = lines[i + 1].trim();
          // Convert to absolute URL if relative
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

    // 3. Set headers for progressive download
    const safeMovieName = typeof movieName === 'string' ? movieName : Array.isArray(movieName) ? movieName[0] : undefined;
    const filename = safeMovieName ? `${encodeURIComponent(safeMovieName)}.mp4` : 'video.mp4';
res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Transfer-Encoding', 'chunked');

    // 4. Stream segments to response
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