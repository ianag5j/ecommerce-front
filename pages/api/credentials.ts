import { getAccessToken } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCredentials } from '../../services/back/credentials'
import logError from 'helpers/logError';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { accessToken } = await getAccessToken(req, res)
    console.log(accessToken);
    if (!accessToken) {
      return res.status(401).json({})
    }
    if (req.method !== 'GET') {
      return res.status(404).json({})
    }

    const credentials = await getCredentials(accessToken, req.query.provider as string)
    console.log(credentials);
    return res.status(200).json({ hasCredentials: typeof credentials !== 'undefined' })
  } catch (error: any) {
    logError(error)
    console.log(error, error.response);
    res.status(500).json({ message: 'Error get credentials' })
  }
}
