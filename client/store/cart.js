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

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
