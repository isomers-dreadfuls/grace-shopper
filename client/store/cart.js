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

// export const removeFromUserCart = product => async dispatch => {
//   dispatch(removeFromCart(product))
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.newCart
    default:
      return state
  }
}
