import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { data: { products } } = await axios.get(`${process.env.LAMBDA_URL}/products`, {
        headers: {
          Authorization: req.headers.authorization as string
        }
      })
      return res.status(200).json({ products })
    }
    if (req.method === 'POST') {
      const { data: { Item } } = await axios.post(`${process.env.LAMBDA_URL}/products`, { name: req.body.name, price: req.body.price }, {
        headers: {
          Authorization: req.headers.authorization as string
        }
      })
      return res.status(200).json({ product: Item })
    }
    return res.status(200).json({});
  }
  catch (error) {
    res.status(500).json({ message: 'error get/create products' })
  }
}
