import axios from 'axios'

const testInfo = [
  {
    id: 1,
    userId: 1,
    inventoryId: 1,
    quantity: 3,
    inventory: {
      id: 1,
      size: 'S',
      quantity: 5,
      productId: 1,
      product: {
        id: 1,
        name: 'SquirrelSweater',
        price: 20,
        image: '/img/product/default-sweater-square.png',
        description: 'testDescription'
      }
    }
  },
  {
    id: 2,
    userId: 1,
    inventoryId: 2,
    quantity: 2,
    inventory: {
      id: 2,
      size: 'M',
      quantity: 6,
      productId: 1,
      product: {
        id: 1,
        name: 'SquirrelSweater',
        price: 20,
        image: '/img/product/default-sweater-square.png',
        description: 'testDescription'
      }
    }
  }
]
const initialState = testInfo

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
  const response = await axios.put('/api/users/addToCart', ids)
  const newCart = response.data
  dispatch(addToCart(newCart))
}

export const reduceFromUserCart = ids => async dispatch => {
  const response = await axios.put('/api/users/reduceFromCart', {ids})
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
