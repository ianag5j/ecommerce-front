import React, { useContext, useState } from 'react'
import Box from 'components/Box'
import CartList from 'components/CartList/CartList'
import Button from 'components/UI/Button'
import LoadingSpinner from 'components/UI/LoadingSpinner'
import { ProductContext } from 'contexts/ProductContext'
import { createOrder } from 'services/orders'
import { useRouter } from 'next/router'
import { ErrorContext } from 'contexts/ErrorContext'

const Buy = () => {
  const { cart } = useContext(ProductContext)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setErrorMessage } = useContext(ErrorContext)
  return (
    <div className='flex flex-col gap-3 w-full'>
      <h2 className='text-xl mb-3'>Finalizar Compra</h2>
      <Box className='m-auto'>
        <CartList />
        <Button disabled={isLoading} onClick={async () => {
          try {
            setIsLoading(true)
            const order = await createOrder(cart, router.query.storeId as string);
            window.location = order.checkoutLink;
          } catch (error: any) {
            setErrorMessage(error.response.data.message)
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