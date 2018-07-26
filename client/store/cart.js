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
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

export const removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  product
})

export const addToUserCart = ids => async dispatch => {
  const response = await axios.put('/api/users/addToCart', {ids})
  const addedProduct = response.data
  dispatch(addToCart(addedProduct))
}

// export const removeFromUserCart = product => async dispatch => {
//   dispatch(removeFromCart(product))
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product]
    default:
      return state
  }
}
