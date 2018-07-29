/* global describe beforeEach afterEach it */

import {createStore, combineReducers} from 'redux'
import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import product, {
  getProduct,
  getAllProducts,
  fetchProduct,
  fetchAllProducts,
  addNewReview
} from './product'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('product thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    product: {
      allProducts: [],
      singleProduct: {}
    }
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchProduct', () => {
    it('successfully fetches one product', async () => {
      const productId = 1
      mockAxios.onGet(`/api/products/${productId}`).replyOnce(200, {id: 1})
      await store.dispatch(fetchProduct(productId))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCT')
      expect(actions[0].product).to.be.deep.equal({id: 1})
    })
  })

  describe('fetchAllProducts', () => {
    it('successfully fetches all products', async () => {
      mockAxios.onGet('/api/products').replyOnce(200, [{id: 1}, {id: 2}])
      await store.dispatch(fetchAllProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS')
      expect(actions[0].allProducts).to.be.deep.equal([{id: 1}, {id: 2}])
    })
  })

  describe('addNewReview', () => {
    it('successfully adds a review', async () => {
      const reviewInfo = {
        rating: 5,
        reviewText: 'sample review',
        userId: 1,
        productId: 1
      }
      const newProduct = {
        name: 'test',
        id: 1,
        price: 10,
        image: 'testimage.jpg'
      }
      mockAxios.onPut('/api/reviews').replyOnce(200, newProduct)
      await store.dispatch(addNewReview(reviewInfo))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(newProduct)
    })
  })
})

describe('product action creators', () => {
  let store
  const reducer = combineReducers({product})
  beforeEach(() => {
    store = createStore(reducer)
  })

  describe('getProduct', () => {
    it('successfully sets single product to product', () => {
      const newProduct = {
        name: 'test',
        id: 1,
        price: 10,
        image: 'testimage.jpg'
      }
      store.dispatch(getProduct(newProduct))
      expect(store.getState().product.singleProduct).to.be.deep.equal(
        newProduct
      )
    })
  })

  describe('getAllProducts', () => {
    it('successfully sets all products to new products array', () => {
      const newProduct1 = {
        name: 'test1',
        id: 1,
        price: 10,
        image: 'testimage1.jpg'
      }
      const newProduct2 = {
        name: 'test2',
        id: 2,
        price: 20,
        image: 'testimage2.jpg'
      }
      store.dispatch(getAllProducts([newProduct1, newProduct2]))
      expect(store.getState().product.allProducts).to.be.deep.equal([
        newProduct1,
        newProduct2
      ])
    })
  })
})
