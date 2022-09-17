import type { NextApiRequest, NextApiResponse } from 'next'
import { getCredentials } from '../../services/back/credentials'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({})
    }
    if (req.method !== 'GET') {
      return res.status(404).json({})
    }

    const credentials = await getCredentials(req.headers.authorization, req.query.provider as string)
    console.log(credentials);

    return res.status(200).json({ hasCredentials: typeof credentials.Provider !== 'undefined' })
  } catch (error) {
    console.log(error.response);
    res.status(500).json({ message: 'Error get credentials' })
  }
}
