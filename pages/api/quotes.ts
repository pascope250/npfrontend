// pages/api/quotes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://quote-generator-api-six.vercel.app/api/quotes/?limit=500');
    // Wrap the data in a "data" property to match your context's expectation
    res.status(200).json({ data: response.data });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch quotes' });
  }
}