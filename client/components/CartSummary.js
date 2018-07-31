import React from 'react'
import {calculateSubtotal} from '../store/cart'
import {Divider} from 'semantic-ui-react'

const CartSummary = props => {
  const subtotal = calculateSubtotal(props.cart)

  return (
    <React.Fragment>
      <h2>Cart Summary</h2>
      <h4 className="cartSummaryDiscount">
        Buy any 3 sweaters and get the 4th one free!
      </h4>
      <Divider />
      {props.cart.map(cartItem => {
        return (
          <h4 key={cartItem.inventoryId}>
            {cartItem.quantity} x {cartItem.inventory.product.name}({
              cartItem.inventory.size
            }): ${cartItem.inventory.product.price}
          </h4>
        )
      })}
      {subtotal[1] > 0 ? (
        <h4 className="cartSummaryDiscount">
          {subtotal[2]} x Family Discount: -${subtotal[1]}
        </h4>
      ) : null}
      <Divider />
      <h3>Subtotal: ${subtotal[0]}</h3>
    </React.Fragment>
  )
}

export default CartSummary
