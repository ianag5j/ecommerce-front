import axios from "axios";

export const createOrder = async (amount: number | string) => {
  const { data: { order } } = await axios.post('/api/create-order', { amount: amount.toString() });
  return order
}