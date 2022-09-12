import React, { useContext } from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const ProductCard = ({ product: { id, name, price } }: any) => {
  const { cart, setCart } = useContext(ProductContext)
  return (
    <div className='dark:bg-surface-dark bg-surface p-3 rounded-md flex flex-col gap-2'>
      <p className='text-lg'>${price}</p>
      <p>{name}</p>
      <button className="rounded p-2 dark:bg-secondary-dark bg-secondary w-full" onClick={() => {
        cart.push({ id, cant: 1, name, price });
        setCart(cart)
      }}>Agregar al carrito</button>
      <button className="rounded p-2 dark:bg-primary-dark bg-primary">Comprar</button>
    </div>
  )
}

export default ProductCard