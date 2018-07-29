import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

const initialState = {
  allProducts: [],
  singleProduct: {}
}

export const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

export const getAllProducts = allProducts => ({
  type: GET_ALL_PRODUCTS,
  allProducts
})

export const fetchProduct = productId => async dispatch => {
  const res = await axios.get(`/api/products/${productId}`)
  const product = res.data
  const action = getProduct(product)
  dispatch(action)
}

export const fetchAllProducts = () => async dispatch => {
  const res = await axios.get('/api/products')
  const allProducts = res.data
  const action = getAllProducts(allProducts)
  dispatch(action)
}

export const addNewReview = reviewInfo => async dispatch => {
  const res = await axios.put('/api/reviews', reviewInfo)
  const product = res.data
  const action = getProduct(product)
  dispatch(action)
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.allProducts
      }
    case GET_PRODUCT:
      return {
        ...state,
        singleProduct: action.product
      }
    default:
      return state
  }
}
