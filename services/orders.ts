import axios from "axios";
import Cookies from "js-cookie";

export const createOrder = async (amount: number | string) => {
  const { data: { order } } = await axios.post('/api/create-order', { amount: amount.toString() }, {
    headers: {
      authorization: Cookies.get('sess') as string
    }
  });
  return order
}