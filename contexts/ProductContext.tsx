import React, { createContext, useEffect, useState } from 'react'
import Product from '../Interfaces/Product'

export const ProductContext = createContext<{ cart: Array<Product>, setCart: Function }>({
  cart: [],
  setCart: () => { }
})



const ProductContextContainer = ({ children }: any) => {
  const [cart, setCart] = useState<Array<Product>>([])
  useEffect(() => {
    setCart(JSON.parse(window.localStorage.getItem('cart') || '[]'))
  }, [])
  const setCartAndPersist = (newCart: Array<Product>) => {
    window.localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart)
  }
  return (
    <ProductContext.Provider value={{
      cart, setCart: setCartAndPersist
    }}>{children}</ProductContext.Provider>
  )
}

export default ProductContextContainer