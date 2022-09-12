import React, { useContext, useState } from 'react'
import CartList from '../components/CartList/CartList'
import { ProductContext } from '../contexts/ProductContext'
import getTotalAmount from '../helpers/getTotalAmount'
import { createOrder } from '../services/orders'

const Buy = () => {
  const { cart } = useContext(ProductContext)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      <h2>Finalizar Compra</h2>
      <div className='dark:bg-surface-dark bg-surface m-2 rounded-md p-4 w-9/12 flex flex-col gap-5'>
        <CartList />
        <button className='rounded p-2 dark:bg-primary-dark bg-primary' disabled={isLoading} onClick={async () => {
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
            <svg className="animate-spin m-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
        </button>
      </div>
    </>
  )
}

export default Buy