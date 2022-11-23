import { getAccessToken } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getOrders } from '../../services/back/orders'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { accessToken } = await getAccessToken(req, res)
    if (!accessToken) {
      return res.status(401).json({})
    }
    if (req.method !== 'GET') {
      return res.status(404).json({})
    }

    const orders = await getOrders(accessToken)
    return res.status(200).json({ orders })
  } catch (error: any) {
    // console.log(error, error.response);
    res.status(500).json({ message: 'Error get orders' })
  }
}
