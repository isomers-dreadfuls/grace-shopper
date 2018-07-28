import React from 'react'
import {Link} from 'react-router-dom'

const CartSummary = props => {
  function calculateSubtotal(cart) {
    let subtotal = 0
    let discount = 0
    let splitCart = []
    cart.forEach(cartItem => {
      subtotal += cartItem.quantity * cartItem.inventory.product.price
      for (let i = 0; i < cartItem.quantity; i++) {
        splitCart.push(cartItem)
      }
    })
    splitCart.sort((a, b) => a.price > b.price)
    let totalDiscountNum = Math.floor(splitCart.length / 4)
    for (let i = 0; i < totalDiscountNum; i++) {
      discount += +splitCart[i].inventory.product.price
    }
    return [
      (subtotal - discount).toFixed(2),
      discount.toFixed(2),
      totalDiscountNum
    ]
  }
  const subtotal = calculateSubtotal(props.cart)

  return (
    <React.Fragment>
      <h2>Cart Summary</h2>
      {props.cart.map(cartItem => {
        return (
          <h4 key={cartItem.id}>
            {cartItem.quantity} x {cartItem.inventory.product.name}({
              cartItem.inventory.size
            }): ${cartItem.inventory.product.price}
          </h4>
        )
      })}
      {subtotal[1] > 0 ? (
        <h4>
          {subtotal[2]} x Family Discount: -${subtotal[1]}
        </h4>
      ) : null}
      <h3>Subtotal: ${subtotal[0]}</h3>
      <Link to="/checkout">Checkout</Link>
    </React.Fragment>
  )
}

export default CartSummary
