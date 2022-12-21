

import { getAccessToken } from '@auth0/nextjs-auth0'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteCredentials } from 'services/back/credentials'

const saveCredentials = async (accessToken: string, userCredentials: any) => (
  axios.post(`${process.env.LAMBDA_URL}/v2/credentials`, {
    externalClientId: userCredentials.client_id,
    externalClientSecret: userCredentials.client_secret_id,
    externalUserName: userCredentials.username
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { accessToken } = await getAccessToken(req, res)
    if (!accessToken) {
      res.status(401).json({})
      return
    }

    if (req.method === 'POST') {
      const { data } = await axios.get(`${process.env.UALA_BFF_URL}/authorize`, {
        params: {
          code: req.body.code,
          state: req.body.state
        }
      })
      console.log(data);
      await saveCredentials(accessToken, data)
      res.status(201).json({ message: 'credentials saved' })
      return
    }

    if (req.method === 'DELETE') {
      await deleteCredentials(accessToken, 'Uala')
      res.status(200).json({ message: 'credentials deleted' })
      return
    }
  } catch (error: any) {
    console.log(error, error.response);
    res.status(500).json({ message: 'Error save/delete credentials' })
  }
}
