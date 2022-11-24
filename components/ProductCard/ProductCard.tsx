import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { ProductContext } from '../../contexts/ProductContext'
import Box from '../Box'
import Button from '../UI/Button'

const ProductCard = ({ product: { id, name, price } }: any) => {
  const { cart, setCart } = useContext(ProductContext)
  const router = useRouter()
  return (
    <Box>
      <b className='text-lg'>${price}</b>
      <p>{name}</p>
      <Button variant='secondary' onClick={() => {
        const alreadyLoadedProduct = cart.find((product) => product.id == id)
        if (alreadyLoadedProduct) {
          alreadyLoadedProduct.cant++
        }
        else {
          cart.push({ id, cant: 1, name, price });
        }
        setCart(cart)
      }}>Agregar al carrito</Button>
      <Button onClick={() => {
        setCart([{ id, cant: 1, name, price }])
        router.push(`${router.query.storeId}/buy`)
      }}>Comprar</Button>
    </Box>
  )
}

export default ProductCard