import React, { createContext, useState } from 'react'

export const ProductContext = createContext({
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