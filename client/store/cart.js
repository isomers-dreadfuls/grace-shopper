import axios from 'axios'

const initialState = []

const ADD_TO_CART = 'ADD_TO_CART'

// this route is used for setting the received cart to the cart store
export const addToCart = newCart => ({
  type: ADD_TO_CART,
  newCart
})

// this route is used for adding items to the cart of the user or guest
// if no inventory id is provided, but the user is logged in, it sends back either a cart from the database that includes Cart instances matching the user's ID
// if no inventory id is provided AND the user is NOT logged in, it sends back a cart from the cookies of the user

// ids variable includes: {
//   userId,
//   inventoryId,
//   quantity
// }
export const addToUserCart = ids => async dispatch => {
  const response = await axios.put('/api/carts/add', ids)
  const newCart = response.data
  dispatch(addToCart(newCart))
}

// this route is used for editing quantity in the cart of the user or guest

// ids variable includes: {
//   userId,
//   inventoryId,
//   quantity
// }
export const editUserCart = ids => async dispatch => {
  const response = await axios.put('/api/carts/edit', ids)
  const newCart = response.data
  dispatch(addToCart(newCart))
}

// this route is used for deleting items completely from the cart of the user or guest

// ids variable includes: {
//   userId,
//   inventoryId,
// }
export const deleteFromUserCart = ids => async dispatch => {
  const response = await axios.put('/api/carts/delete', ids)
  const newCart = response.data
  dispatch(addToCart(newCart))
}

// this helper function is used to calculate subtotals and discounts. It returns an array of length 3
// index 0: subtotal after discount is subtracted
// index 1: discount
// index 2: total amount of items that are being discounted (this is currently set to: buy 3 get 1 free)
export const calculateSubtotal = cart => {
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

// this function uses the stripe route
// it is used for checking out the cart, and afterwards clearing the cart
export const checkout = info => async dispatch => {
  await axios.post('/api/stripe', {
    cart: info.cart,
    amount: calculateSubtotal(info.cart)[0],
    id: info.id,
    userId: info.userId
  })
  dispatch(addToCart([]))
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.newCart
    default:
      return state
  }
}
