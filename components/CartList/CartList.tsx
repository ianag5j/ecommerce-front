import React, { useContext } from 'react'
import { ProductContext } from '../../contexts/ProductContext'
import getTotalAmount from '../../helpers/getTotalAmount'

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
      <span className='ml-auto'>Total: ${getTotalAmount(cart)}</span>
    </div>
  )
}

export default CartList