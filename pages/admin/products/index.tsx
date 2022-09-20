import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Box from '../../../components/Box'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import WithAuth from '../../../components/WithAuth'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    axios.get('/api/products', {
      headers: {
        authorization: `Bearer ${Cookies.get('sess')}`
      }
    }).then(({ data }) => {
      setProducts(data.products)
      setIsLoading(false)
    })
  })
  return (
    <div className='flex flex-col gap-3 w-full'>
      <h2 className='text-xl'>Productos</h2>
      <Link href="/admin/products/create">
        <button className='rounded p-2 dark:bg-primary-dark bg-primary w-full md:max-w-xl mb-3 m-auto'>+</button>
      </Link>
      <div className="flex w-full gap-2">
        {isLoading && <LoadingSpinner />}
        {products.map((product: any) => (
          <Box key={`product-${product.id}`}>
            <b className='text-lg'>${product.price}</b>
            <p>{product.name}</p>
          </Box>
        ))}
      </div>
    </div>
  )
}

export default WithAuth(ProductsPage)