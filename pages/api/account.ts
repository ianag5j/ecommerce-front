import { getAccessToken } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getStore } from 'services/back/store';
import { getCredentials } from '../../services/back/credentials'

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

    const [credentials, store] = await Promise.all([getCredentials(accessToken, req.query.provider as string), getStore(accessToken)])
    return res.status(200).json({ hasUalaCredentials: typeof credentials !== 'undefined', store })
  } catch (error: any) {
    console.log(error, error.response);
    res.status(500).json({ message: 'Error get account data' })
  }
}
