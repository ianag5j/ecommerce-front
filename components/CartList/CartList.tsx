import React, { useContext } from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const CartList = () => {
  const { cart } = useContext(ProductContext)
  return (
    <div className='is-flex is-flex-direction-column'>
      <ul>
        {cart.map((product) => (
          <li key={`key-${product.name}`} className="py-2">{product.name} x {product.cant} | ${product.cant * product.price}</li>
        ))}
      </ul>
      <hr />
      <span className='ml-auto'>Total: ${Math.round(cart.reduce((partialSum, product) => partialSum + parseFloat(`${product.price}`), 0))}</span>
    </div>
  )
}

export default CartList