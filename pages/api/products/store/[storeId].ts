import axios from 'axios';
import logError from 'helpers/logError';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({});
    }
    const { storeId } = req.query
    const { data: { products } } = await axios.get(`${process.env.LAMBDA_URL}/store/${storeId}/products`)
    return res.status(200).json({ products })
  }
  catch (error) {
    logError(error)
    res.status(500).json({ message: 'error get products' })
  }
}
