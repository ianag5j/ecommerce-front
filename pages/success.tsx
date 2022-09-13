import React, { useContext } from 'react'
import Box from '../components/Box'
import CartList from '../components/CartList/CartList'
import { ProductContext } from '../contexts/ProductContext'

const Success = () => {
  const { setCart } = useContext(ProductContext)
  if (typeof window !== 'undefined') {
    addEventListener('beforeunload', () => {
      setCart([])
    })
  }
  return (
    <>
      <h2>Compra Finalizada</h2>
      <Box>
        <CartList />
      </Box>
    </>
  )
}

export default Success