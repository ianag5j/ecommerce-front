import { getAccessToken } from '@auth0/nextjs-auth0';
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../Interfaces/Product';
import { getCredentials, Credentials } from '../../services/back/credentials';
import ualaBisSDK from 'ualabis-nodejs'

type Data = {
  order?: object;
  message?: string;
}


const getToken = async (credentials: Credentials): Promise<string> => {
  try {
    const { data: { access_token: accessToken } } = await axios.post('/1/auth/token', {
      "user_name": credentials.externalUserName,
      "client_id": credentials.externalClientId,
      "client_secret_id": credentials.externalClientSecret,
      "grant_type": 'client_credentials',
    }, { baseURL: process.env.UALA_AUTH_URL })
    return accessToken
  } catch (error) {
    console.log(error);
    throw error
  }
}

const createUalaOrder = async (orderId: string, amount: string, accessToken: string) => {
  try {
    const credentials = await getCredentials(accessToken, 'Uala')
    await ualaBisSDK.setUp({
      userName: credentials.externalUserName,
      clientId: credentials.externalClientId,
      clientSecret: credentials.externalClientSecret,
      isDev: true
    })

    return await ualaBisSDK.createOrder({
      amount: parseFloat(amount),
      description: "Venta",
      callbackFail: `${process.env.NEXT_PUBLIC_BASE_URL}/fail`,
      callbackSuccess: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      notificationUrl: `${process.env.LAMBDA_URL}/webhook/order/${orderId}`
    })
  } catch (error) {
    console.log(error);
    throw error
  }
}

const createOrder = async (cart: Array<Product>, accessToken: string) => {
  const { data: { order } } = await axios.post(`${process.env.LAMBDA_URL}/orders`, { cart }, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return order
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { accessToken } = await getAccessToken(req, res)
    if (req.method !== 'POST') {
      return res.status(400)
    }
    if (!accessToken) {
      return res.status(401).json({})
    }
    const order = await createOrder(req.body.cart, accessToken)
    const ualaOrder = await createUalaOrder(order.Id.S, order.Amount.S, accessToken)
    return res.status(201).json({ order: ualaOrder })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error create credencials' })
  }
}
