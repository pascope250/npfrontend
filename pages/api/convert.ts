import type { NextApiRequest, NextApiResponse } from 'next';
import ffmpegPath from 'ffmpeg-static';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const videoUrl = req.query.url as string;
  if (!videoUrl) return res.status(400).json({ error: 'Missing video URL' });

  // Build a full URL if input is a relative API path
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const fullInputUrl = videoUrl.startsWith('http') ? videoUrl : `${protocol}://${host}${videoUrl}`;

  const outputFileName = `converted_${Date.now()}.mp4`;
  const outputPath = path.join(process.cwd(), 'public', 'converted', outputFileName);

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const headers = 'User-Agent: Mozilla/5.0\r\nReferer: https://dhcplay.com\r\n';
  const headersEscaped = headers.replace(/\r?\n/g, '\\r\\n');

  const cmd = `"${ffmpegPath}" -headers "${headersEscaped}" -i "${fullInputUrl}" -c copy "${outputPath}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('FFmpeg error:', err);
      console.error('FFmpeg stderr:', stderr);
      return res.status(500).json({ error: 'Failed to convert video' });
    }

    const downloadUrl = `/converted/${outputFileName}`;
    res.status(200).json({ downloadUrl });
  });
}
