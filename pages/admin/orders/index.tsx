import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Box from '../../../components/Box'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import WithAuth from '../../../components/WithAuth'

const OrdersPage = () => {
  const [orders, setOrders] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    axios.get('/api/orders', {
      headers: {
        authorization: Cookies.get('sess') as string
      }
    })
      .then(({ data }) => {
        setOrders(data.orders)

      })
      .catch(() => {
        alert('Error al obtener las ordenes')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [isLoading])
  return (
    <div className='flex flex-col gap-3 w-full'>
      <h2 className='text-xl'>Ordenes</h2>
      <div className="flex w-full gap-2">
        {isLoading && <LoadingSpinner />}
        {orders.map((orders: any) => (
          <Box key={`orders-${orders.Id}`}>
            <b className='text-lg'>Monto ${orders.Amount}</b>
            <p>Estado: {orders.Status}</p>
            <p>Creado: {new Date(orders.CreatedAt).toLocaleString()}</p>
          </Box>
        ))}
      </div>
    </div>
  )
}

export default WithAuth(OrdersPage)