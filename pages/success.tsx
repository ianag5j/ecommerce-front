import React, { useContext } from 'react'
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
      <div className='dark:bg-surface-dark bg-surface rounded-md p-4 w-9/12 mx-auto'>
        <CartList />
      </div>
    </>
  )
}

export default Success