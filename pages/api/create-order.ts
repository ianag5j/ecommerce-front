import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  order?: object;
  message?: string;
}


const getToken = async (): Promise<string> => {
  try {
    const { data: { access_token: accessToken } } = await axios.post('/1/auth/token', {
      "user_name": process.env.UALA_USER_NAME,
      "client_id": process.env.UALA_CLIENT_ID,
      "client_secret_id": process.env.UALA_CLIENT_SECRET_ID,
      "grant_type": 'client_credentials',
    }, { baseURL: process.env.UALA_AUTH_URL })
    return accessToken
  } catch (error) {
    console.log(error);
    throw error
  }
}

const createOrder = async (amount: number) => {
  const accessToken = await getToken()
  const data = {
    "userName": process.env.UALA_USER_NAME,
    "amount": '10',
    "description": "Venta",
    "callback_fail": `${process.env.BASE_URL}/fail`,
    "callback_success": `${process.env.BASE_URL}/success`,
  }

  try {
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



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== 'POST') {
      return res.status(400)
    }
    const order = await createOrder(req.body.amount)
    if (order) {
      return res.status(201).json({ order })
    }
  } catch (error) {
    res.status(500).json({ message: 'error create credencials' })
  }
}
