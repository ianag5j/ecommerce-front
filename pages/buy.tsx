import React, { useContext, useState } from 'react'
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
    <>
      <h2>Finalizar Compra</h2>
      <div className='dark:bg-surface-dark bg-surface m-2 rounded-md p-4 w-9/12 flex flex-col gap-5 mx-auto'>
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
      </div>
    </>
  )
}

export default Buy