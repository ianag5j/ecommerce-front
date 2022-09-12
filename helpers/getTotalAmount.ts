import Product from "../Interfaces/Product"

const getTotalAmount = (cart: Array<Product>) => {
  return Math.round(cart.reduce((partialSum, product) => partialSum + parseFloat(`${product.price}`), 0))
}

export default getTotalAmount