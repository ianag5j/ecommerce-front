

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

const getCredentials = async (accessToken: string, provider: string) => {
  const { data } = await axios.get(`${process.env.LAMBDA_URL}/credentials`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({})
    }
    if (req.method === 'GET') {
      const credentials = await getCredentials(req.headers.authorization, 'Uala')
      return res.status(200).json({ credentials })
    }

    const { data } = await axios.get(`${process.env.UALA_BFF_URL}/authorize`, {
      params: {
        code: req.body.code,
        state: req.body.state
      }
    })
    console.log(data);

    await saveCredentials(req.headers.authorization, data)
    return res.status(201).json({ message: 'credentials saved' })
  } catch (error) {
    console.log(error.response);
    res.status(500).json({ message: 'Error get credentials' })
  }
}
