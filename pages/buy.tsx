import React, { useContext, useState } from 'react'
import Box from '../components/Box'
import CartList from '../components/CartList/CartList'
import Button from '../components/UI/Button'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { ProductContext } from '../contexts/ProductContext'
import getTotalAmount from '../helpers/getTotalAmount'
import { createOrder } from '../services/orders'

const Buy = () => {
  const { cart } = useContext(ProductContext)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-xl mb-3'>Finalizar Compra</h2>
      <Box>
        <CartList />
        <Button disabled={isLoading} onClick={async () => {
          try {
            setIsLoading(true)
            const order = await createOrder(getTotalAmount(cart));
            window.location = order.links.checkoutLink;
          } catch (error) {
            alert('Error al crear la solicitud de pago');
            setIsLoading(false)
          }
        }}>
          {!isLoading ? 'Pagar' : (
            <LoadingSpinner />
          )}
        </Button>
      </Box>
    </div>
  )
}

export default Buy