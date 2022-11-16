import axios from "axios"

const getProductsByStore = async (storeId: string) => {
  const { data: { products } } = await axios.get(`/api/products/store/${storeId}`)
  return products
}

export { getProductsByStore }