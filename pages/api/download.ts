// import type { NextApiRequest, NextApiResponse } from 'next';
// import { spawn } from 'child_process';
// import path from 'path';
// import { tmpdir } from 'os';
// import { createReadStream, unlinkSync } from 'fs';
// import { v4 as uuidv4 } from 'uuid';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const videoUrl = req.query.url as string;
//   if (!videoUrl) return res.status(400).json({ error: 'Missing url' });

//   const tempFile = path.join(tmpdir(), `video-${uuidv4()}.mp4`);

//   try {
//     // Use yt-dlp instead of ffmpeg
//     const ytdlp = spawn('yt-dlp', [
//       '-o', tempFile, // Output file
//       '--merge-output-format', 'mp4', // Force MP4 output
//       '--no-check-certificate', // Bypass SSL verification if needed
//       '--referer', 'https://dhcplay.com', // Set referer header
//       '--user-agent', 'Mozilla/5.0', // Set user agent
//       videoUrl
//     ]);

//     // Collect logs for debugging
//     let stderr = '';
//     ytdlp.stderr.on('data', (data) => {
//       stderr += data.toString();
//       console.error('[yt-dlp]', data.toString());
//     });

//     await new Promise((resolve, reject) => {
//       ytdlp.on('close', (code) => {
//         if (code !== 0) {
//           console.error('yt-dlp failed with code:', code);
//           console.error('Error output:', stderr);
//           reject(new Error(`yt-dlp failed with code ${code}`));
//           return;
//         }
//         resolve(true);
//       });
      
//       ytdlp.on('error', (err) => {
//         console.error('yt-dlp process error:', err);
//         reject(err);
//       });
//     });

//     // Set headers and stream the file
//     res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');
//     res.setHeader('Content-Type', 'video/mp4');

//     const fileStream = createReadStream(tempFile);
//     fileStream.pipe(res);

//     fileStream.on('close', () => {
//       try {
//         unlinkSync(tempFile);
//       } catch (cleanupErr) {
//         console.error('Cleanup error:', cleanupErr);
//       }
//     });

//   } catch (error) {
//     console.error('Download failed:', error);
//     return res.status(500).json({ 
//       error: 'Failed to download video',
//       details: error instanceof Error ? error.message : String(error)
//     });
//   }
// }




// import type { NextApiRequest, NextApiResponse } from 'next';
// import { spawn } from 'child_process';
// import path from 'path';
// import { tmpdir } from 'os';
// import { createReadStream, unlinkSync } from 'fs';
// import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const videoUrl = req.query.url as string;
//   if (!videoUrl) return res.status(400).json({ error: 'Missing URL' });

//   // Generate a more descriptive filename
//   const filename = `video-${Date.now()}.mp4`;
//   const tempFile = path.join(tmpdir(), filename);

//   try {
//     const ytdlp = spawn('yt-dlp', [
//       '-o', tempFile,
//       '--merge-output-format', 'mp4',
//       '--downloader', 'ffmpeg', // Force FFmpeg for better HLS support
//       '--hls-use-mpegts', // Required for live streams
//       '--no-check-certificate',
//       '--retries', '3', // Reduced from default 10
//       '--socket-timeout', '10', // Timeout in seconds
//       '--referer', 'https://dhcplay.com',
//       '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
//       videoUrl
//     ]);

//     // Improved logging
//     let stdout = '';
//     let stderr = '';
    
//     ytdlp.stdout.on('data', (data) => {
//       stdout += data.toString();
//       console.log('[yt-dlp]', data.toString());
//     });

//     ytdlp.stderr.on('data', (data) => {
//       stderr += data.toString();
//       console.error('[yt-dlp]', data.toString());
//     });

//     await new Promise((resolve, reject) => {
//       ytdlp.on('close', (code) => {
//         if (code !== 0) {
//           const error = new Error(`yt-dlp failed with code ${code}`);
//           (error as any).stderr = stderr;
//           reject(error);
//           return;
//         }
//         resolve(true);
//       });
      
//       ytdlp.on('error', reject);
//     });

//     // Set headers for browser-native download
//     res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
//     res.setHeader('Content-Type', 'video/mp4');
//     res.setHeader('Content-Length', fs.statSync(tempFile).size);

//     const fileStream = createReadStream(tempFile);
//     fileStream.pipe(res);

//     fileStream.on('close', () => {
//       try {
//         unlinkSync(tempFile);
//       } catch (cleanupErr) {
//         console.error('Cleanup error:', cleanupErr);
//       }
//     });

//     fileStream.on('error', (streamError) => {
//       console.error('Stream error:', streamError);
//       res.destroy();
//     });

//   } catch (error) {
//     console.error('Download failed:', error);
    
//     // Enhanced error response
//     return res.status(500).json({ 
//       error: 'Failed to download video',
//       details: {
//         message: error instanceof Error ? error.message : String(error),
//         stderr: (error as any).stderr || 'No additional error info'
//       },
//       solution: 'This may be a temporary issue. Please try again later.'
//     });
//   }
// }


// import type { NextApiRequest, NextApiResponse } from 'next';
// import { spawn } from 'child_process';
// import path from 'path';
// import { tmpdir } from 'os';
// import { createReadStream, unlinkSync, statSync } from 'fs';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { url } = req.query;

//   if (!url || typeof url !== 'string') {
//     return res.status(400).json({ error: 'URL parameter is required' });
//   }

//   // Generate unique filename
//   const filename = `download-${Date.now()}.mp4`;
//   const tempFile = path.join(tmpdir(), filename);

//   try {
//     // Use yt-dlp to download the HLS stream
//     const ytdlp = spawn('yt-dlp', [
//       '-o', tempFile,
//       '--merge-output-format', 'mp4',
//       '--hls-use-mpegts',
//       '--downloader', 'ffmpeg',
//       '--no-check-certificate',
//       '--referer', 'https://dhcplay.com',
//       '--user-agent', 'Mozilla/5.0',
//       '--retries', '3',
//       url
//     ]);

//     // Handle process output
//     ytdlp.stderr.on('data', (data) => {
//       console.error('[yt-dlp error]', data.toString());
//     });

//     ytdlp.stdout.on('data', (data) => {
//       console.log('[yt-dlp output]', data.toString());
//     });

//     // Wait for download to complete
//     await new Promise((resolve, reject) => {
//       ytdlp.on('close', (code) => {
//         if (code !== 0) {
//           reject(new Error(`yt-dlp failed with code ${code}`));
//           return;
//         }
//         resolve(true);
//       });
      
//       ytdlp.on('error', reject);
//     });

//     // Set headers
//     res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
//     res.setHeader('Content-Type', 'video/mp4');
//     res.setHeader('Content-Length', statSync(tempFile).size.toString());

//     // Stream the file
//     const fileStream = createReadStream(tempFile);
//     fileStream.pipe(res);

//     // Clean up after streaming
//     fileStream.on('close', () => {
//       try {
//         unlinkSync(tempFile);
//       } catch (err) {
//         console.error('Error deleting temp file:', err);
//       }
//     });

//     // Handle client disconnection
//     req.on('close', () => {
//       fileStream.destroy();
//     });

//   } catch (error) {
//     console.error('Download failed:', error);
//     return res.status(500).json({ 
//       error: 'Download failed',
//       details: error instanceof Error ? error.message : String(error)
//     });
//   }
// }



import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';
import { tmpdir } from 'os';
import { createReadStream, unlinkSync, statSync } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  // Generate unique filename
  const filename = `download-${Date.now()}.mp4`;
  const tempFile = path.join(tmpdir(), filename);

  try {
    // Create a simple progress tracking system
    let lastProgressUpdate = 0;
    let downloadSpeed = '0 B/s';
    let eta = 'Unknown';

    const ytdlp = spawn('yt-dlp', [
      '-o', tempFile,
      '--merge-output-format', 'mp4',
      '--hls-use-mpegts',
      '--downloader', 'ffmpeg',
      '--no-check-certificate',
      '--referer', 'https://dhcplay.com',
      '--user-agent', 'Mozilla/5.0',
      '--retries', '3',
      '--progress-template', '"%(progress.downloaded_bytes)s %(progress.total_bytes)s %(progress.speed)s %(progress.eta)s"',
      url
    ]);

    // Handle process output
    ytdlp.stderr.on('data', (data) => {
      const output = data.toString();
      console.error('[yt-dlp error]', output);
      
      // Parse progress updates from stderr
      if (output.includes('[download]')) {
        const progressMatch = output.match(/\[download\]\s+(\d+\.\d+)%/);
        if (progressMatch && progressMatch[1]) {
          const progress = parseFloat(progressMatch[1]);
          if (progress > lastProgressUpdate) {
            lastProgressUpdate = progress;
            console.log(`Progress: ${progress}%`);
          }
        }
      }
    });

    ytdlp.stdout.on('data', (data) => {
      console.log('[yt-dlp output]', data.toString());
    });

    // Wait for download to complete
    await new Promise((resolve, reject) => {
      ytdlp.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`yt-dlp failed with code ${code}`));
          return;
        }
        resolve(true);
      });
      
      ytdlp.on('error', reject);
    });

    // Set headers
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', statSync(tempFile).size.toString());

    // Stream the file
    const fileStream = createReadStream(tempFile);
    fileStream.pipe(res);

    // Clean up after streaming
    fileStream.on('close', () => {
      try {
        unlinkSync(tempFile);
      } catch (err) {
        console.error('Error deleting temp file:', err);
      }
    });

    // Handle client disconnection
    req.on('close', () => {
      fileStream.destroy();
    });

  } catch (error) {
    console.error('Download failed:', error);
    return res.status(500).json({ 
      error: 'Download failed',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}