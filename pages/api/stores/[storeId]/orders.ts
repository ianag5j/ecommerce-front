import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from 'Interfaces/Product';
import getErrorMessage from 'helpers/getErrorMessage';

type Data = {
  order?: object;
  message?: string;
}
const createOrder = async (cart: Array<Product>, storeName: string) => {
  const { data } = await axios.post(`${process.env.LAMBDA_URL}/v2/orders`, { cart, storeName })
  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== 'POST') {
      return res.status(400)
    }

    const order = await createOrder(req.body.cart, req.query.storeId as string)
    return res.status(201).json({
      order: {
        checkoutLink: order.ualaOrder.links.checkoutLink
      }
    })
  } catch (error: any) {
    console.log(error);
    let errorMessage = 'Error al crear la orden'
    if (error.response.data.errorCode) {
      errorMessage = getErrorMessage(error.response.data.errorCode)
    }
    res.status(500).json({ message: errorMessage })
  }
}
