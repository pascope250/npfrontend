import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const targetUrl = req.query.url as string;

  if (!targetUrl || !targetUrl.startsWith('https://dhcplay.com/')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  https.get(targetUrl, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
    proxyRes.pipe(res);
  }).on('error', (err) => {
    res.status(500).json({ error: err.message });
  });
}
