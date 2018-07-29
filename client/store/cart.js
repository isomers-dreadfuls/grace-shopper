import axios from 'axios'
const initialState = []

const ADD_TO_CART = 'ADD_TO_CART'

export const addToCart = newCart => ({
  type: ADD_TO_CART,
  newCart
})

export const addToUserCart = ids => async dispatch => {
  const response = await axios.put('/api/carts/add', ids)
  const newCart = response.data
  dispatch(addToCart(newCart))
}

export const editUserCart = ids => async dispatch => {
  const response = await axios.put('/api/carts/edit', ids)
  const newCart = response.data
  dispatch(addToCart(newCart))
}

export const deleteFromUserCart = ids => async dispatch => {
  const response = await axios.put('/api/carts/delete', ids)
  const newCart = response.data
  dispatch(addToCart(newCart))
}

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

export const checkout = info => async dispatch => {
  await axios.post('/api/stripe', {
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
