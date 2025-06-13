import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  try {
    const response = await fetch(url, {
      headers: {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36',
  'Referer': 'https://dhcplay.com/',
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cookie': 'session=xxxx; othercookie=yyyy',
  'Origin': 'https://dhcplay.com',
    'Connection': 'keep-alive',
}
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Failed to fetch stream: ${response.statusText}` });
    }

    // Pipe the response stream directly to client
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/vnd.apple.mpegurl');
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow CORS for your frontend

    if (response.body) {
      response.body.pipe(res);
    } else {
      res.status(500).json({ error: 'No response body to stream.' });
    }

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
