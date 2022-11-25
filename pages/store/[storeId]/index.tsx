import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CartList from 'components/CartList/CartList'
import ProductCard from 'components/ProductCard'
import RigthDrawer from 'components/RigthDrawer'
import LoadingSpinner from 'components/UI/LoadingSpinner'
import { getProductsByStore } from 'services/store'

const UserStore = () => {
  const router = useRouter()
  const { storeId } = router.query
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCartList, setShowCartList] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      const products = await getProductsByStore(storeId as string)
      setProducts(products)
      setIsLoading(false)
    }
    if (storeId) {
      getProducts()
    }
  }, [storeId])

  return (
    <div className='flex flex-col gap-3 w-full'>
      <h2 className='text-xl'>Productos</h2>
      <div className="flex w-full gap-2">
        {isLoading && <LoadingSpinner />}
        {products.map((product: any) => (
          <ProductCard key={`product-${product.id}`} product={product}>
            <b className='text-lg'>${product.price}</b>
            <p>{product.name}</p>
          </ProductCard>
        ))}
        <RigthDrawer isOpen={showCartList} onClose={setShowCartList} title="Carrito">
          <>
            <CartList />
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent dark:bg-primary-dark bg-primary px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => router.push(`${router.query.storeId}/buy`)}
            >
              Comprar
            </button>
            <button
              type="button"
              onClick={() => setShowCartList(false)}
              className="inline-flex w-full justify-center rounded-md border border-gray-300 dark:bg-secondary-dark bg-secondary px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </>
        </RigthDrawer>
        <div className='w-full dark:bg-surface-dark bg-surface p-4 absolute bottom-0 left-0'>
          <button className='rounded p-2 dark:bg-primary-dark bg-primary ml-auto sm:w-auto w-full float-right' onClick={() => setShowCartList(true)}>Finalizar compra</button>
        </div>
      </div>
    </div>
  )
}

export default UserStore