import axios from "axios";
import Product from "../Interfaces/Product";

export const createOrder = async (cart: Array<Product>, storeId: string) => {
  const { data: { order } } = await axios.post(`/api/stores/${storeId}/orders`, { cart });
  return order
}