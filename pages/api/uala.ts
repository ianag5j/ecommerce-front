

import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const saveCredentials = async (accessToken: string, userCredentials: any) => (
  axios.post(`${process.env.LAMBDA_URL}/credentials`, {
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
    if (!req.headers.authorization) {
      res.status(401).json({})
      return
    }

    const { data } = await axios.get(`${process.env.UALA_BFF_URL}/authorize`, {
      params: {
        code: req.body.code,
        state: req.body.state
      }
    })
    console.log(data);
    await saveCredentials(req.headers.authorization, data)
    res.status(201).json({ message: 'credentials saved' })
  } catch (error: any) {
    console.log(error, error.response);
    res.status(500).json({ message: 'Error save credentials' })
  }
}
