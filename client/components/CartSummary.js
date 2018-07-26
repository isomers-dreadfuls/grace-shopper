import React from 'react'
import {Link} from 'react-router-dom'

const CartSummary = props => {
  function calculateSubtotal(cart) {
    let subtotal = 0
    cart.map(cartItem => {
      subtotal += cartItem.quantity * cartItem.inventory.product.price
    })
    return subtotal.toFixed(2)
  }

  return (
    <React.Fragment>
      <h2>Cart Summary</h2>
      <h3>Subtotal: ${calculateSubtotal(props.cart)}</h3>
      {/* <Link to={Checkout}>Checkout</Link> */}
    </React.Fragment>
  )
}

export default CartSummary
