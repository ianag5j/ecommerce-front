import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../Interfaces/Product';
import { getCredentials, Credentials } from '../../services/back/credentials';

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

const createUalaOrder = async (orderId: string, amount: string, req: NextApiRequest) => {
  try {
    const credentials = await getCredentials(req.headers.authorization as string, 'Uala')
    const accessToken = await getToken(credentials)
    const data = {
      "userName": credentials.externalUserName,
      amount,
      "description": "Venta",
      "callback_fail": `${process.env.NEXT_PUBLIC_BASE_URL}/fail`,
      "callback_success": `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      "notification_url": `${process.env.LAMBDA_URL}/webhook/order/${orderId}`
    }
    console.log(data);
    const { data: order } = await axios.post('/1/checkout', data, {
      baseURL: process.env.UALA_API_URL, headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return order
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
    if (req.method !== 'POST') {
      return res.status(400)
    }
    const order = await createOrder(req.body.cart, req.headers.authorization as string)
    const ualaOrder = await createUalaOrder(order.Id.S, order.Amount.S, req)

    return res.status(201).json({ order: ualaOrder })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error create credencials' })
  }
}
