import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'

const initialState = {
  singleProduct: {}
}

const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

export const fetchProduct = productId => async dispatch => {
  const res = await axios.get(`/api/products/${productId}`)
  const product = res.data
  const action = getProduct(product)
  dispatch(action)
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        singleProduct: action.product
      }
    default:
      return state
  }
}
