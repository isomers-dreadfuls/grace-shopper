import axios from 'axios'
document.cookie = 'cart=[]'
const initialState = []

const ADD_TO_CART = 'ADD_TO_CART'
const REDUCE_FROM_CART = 'REDUCE_FROM_CART'

export const addToCart = newCart => ({
  type: ADD_TO_CART,
  newCart
})

export const reduceFromCart = product => ({
  type: REDUCE_FROM_CART,
  product
})

export const addToUserCart = ids => async dispatch => {
  const response = await axios.put('/api/carts/add', ids)
  const newCart = response.data
  dispatch(addToCart(newCart))
}

export const reduceFromUserCart = ids => async dispatch => {
  const response = await axios.put('/api/carts/reduce', {ids})
  const removedProduct = response.data
  dispatch(reduceFromCart(removedProduct))
}

// export const removeFromUserCart = product => async dispatch => {
//   dispatch(removeFromCart(product))
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.newCart
    case REDUCE_FROM_CART:
      return [
        ...state.filter(elem => elem.id !== action.product.id),
        action.product
      ]
    default:
      return state
  }
}
