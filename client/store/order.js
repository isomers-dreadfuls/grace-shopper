import axios from 'axios'

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

const initialState = []

// this route is for setting all orders in the store
export const getAllOrders = allOrders => ({
  type: GET_ALL_ORDERS,
  allOrders
})

// this route is for retrieving all the orders from the database
export const fetchAllOrders = id => async dispatch => {
  const res = await axios.get(`/api/orders/${id}`)
  const allOrders = res.data
  const action = getAllOrders(allOrders)
  dispatch(action)
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.allOrders
    default:
      return state
  }
}
