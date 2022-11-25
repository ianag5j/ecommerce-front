import { getAccessToken } from '@auth0/nextjs-auth0'
import getErrorMessage from 'helpers/getErrorMessage'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createStore } from '../../services/back/store'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { accessToken } = await getAccessToken(req, res)
    if (!accessToken) {
      return res.status(401).json({})
    }
    if (req.method !== 'POST') {
      return res.status(404).json({})
    }

    const orders = await createStore(req.body.name, accessToken)
    return res.status(200).json({ orders })
  } catch (error: any) {
    let errorMessage = 'Error al crear la tienda'
    console.log(error.response.data);
    if (error.response.data.errorCode) {
      errorMessage = getErrorMessage(error.response.data.errorCode)
    }
    res.status(500).json({ message: errorMessage })
  }
}
