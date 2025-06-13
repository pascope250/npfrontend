// pages/api/puppeteer-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const iframeUrl = req.query.url as string;

  if (!iframeUrl) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    let videoUrl: string | null = null;

    // Listen for all responses
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('.m3u8')) {
        console.log('[Detected]', url);
        videoUrl = url;
      }
    });

    await page.goto(iframeUrl, { waitUntil: 'networkidle2', timeout: 15000 });

    // Wait manually until .m3u8 is found (or timeout)
    const timeout = 15000; // 15 seconds
    const checkInterval = 500;
    let waited = 0;
    while (!videoUrl && waited < timeout) {
      await new Promise(res => setTimeout(res, checkInterval));
      waited += checkInterval;
    }

    await browser.close();

    if (!videoUrl) {
      return res.status(404).json({ error: 'Video stream not found' });
    }

    return res.status(200).json({ videoUrl });

  } catch (err: any) {
    console.error('[Puppeteer Error]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
