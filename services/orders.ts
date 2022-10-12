import axios from "axios";
import Cookies from "js-cookie";
import Product from "../Interfaces/Product";

export const createOrder = async (cart: Array<Product>) => {
  const { data: { order } } = await axios.post('/api/create-order', { cart }, {
    headers: {
      authorization: Cookies.get('sess') as string
    }
  });

  return order
}