import React, { useContext } from 'react'
import { ProductContext } from '../../contexts/ProductContext'
import Box from '../Box'

const ProductCard = ({ product: { id, name, price } }: any) => {
  const { cart, setCart } = useContext(ProductContext)
  return (
    <Box>
      <b className='text-lg'>${price}</b>
      <p>{name}</p>
      <button className="rounded p-2 dark:bg-secondary-dark bg-secondary w-full" onClick={() => {
        console.log(cart);

        const alreadyLoadedProduct = cart.find((product) => product.id == id)
        console.log({ alreadyLoadedProduct });

        if (alreadyLoadedProduct) {
          alreadyLoadedProduct.cant++
        }
        else {
          cart.push({ id, cant: 1, name, price });
        }
        setCart(cart)
      }}>Agregar al carrito</button>
      <button className="rounded p-2 dark:bg-primary-dark bg-primary">Comprar</button>
    </Box>
  )
}

export default ProductCard