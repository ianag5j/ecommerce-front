import axios from "axios"

export interface Order {
  Id: string,
  UserId: string
  Amount: string
  Status: string
  CreatedAt: string
  UpdatedAt: string
}

export const getOrders = async (accessToken: string): Promise<{ orders: [Order] }> => {
  const { data: { orders } } = await axios.get(`${process.env.LAMBDA_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  })
  return orders
}