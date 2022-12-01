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
    if (isLoading) {
      axios.get('/api/products').
        then(({ data }) => {
          setProducts(data.products)
          setIsLoading(false)
        })
    }
  }, [isLoading])
  return (
    <div className='flex flex-col gap-3 w-full'>
      <h2 className='text-xl'>Productos</h2>
      <Link href="/admin/products/create">
        <button className='rounded p-2 dark:bg-primary-dark bg-primary w-full md:max-w-xl mb-3 m-auto'>+</button>
      </Link>
      {isLoading && <LoadingSpinner />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2">
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