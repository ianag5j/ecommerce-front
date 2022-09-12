import React, { createContext, useState } from 'react'
import Product from '../Interfaces/Product'

export const ProductContext = createContext<{ cart: Array<Product>, setCart: Function }>({
  cart: [],
  setCart: () => { }
})



const ProductContextContainer = ({ children }: any) => {
  const [cart, setCart] = useState([])
  return (
    <ProductContext.Provider value={{ cart, setCart }}>{children}</ProductContext.Provider>
  )
}

export default ProductContextContainer