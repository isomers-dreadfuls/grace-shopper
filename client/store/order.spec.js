/* global describe beforeEach afterEach it */

import {createStore, combineReducers} from 'redux'
import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import order, {getAllOrders, fetchAllOrders} from './order'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

const newOrder1 = {
  price: 1000,
  shippingAddress: 'test1',
  shippingCity: 'test1',
  shippingState: 'test1',
  shippingZip: 11111,
  orderStatus: 'placed',
  userId: 1
}
const newOrder2 = {
  price: 2000,
  shippingAddress: 'test2',
  shippingCity: 'test2',
  shippingState: 'test2',
  shippingZip: 11111,
  orderStatus: 'placed',
  userId: 1
}

describe('order thunk creators', () => {
  let store
  let mockAxios

  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllOrders', () => {
    it('successfully fetches all orders', async () => {
      mockAxios.onGet('/api/orders/1').replyOnce(200, [newOrder1, newOrder2])
      await store.dispatch(fetchAllOrders(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_ORDERS')
      expect(actions[0].allOrders).to.be.deep.equal([newOrder1, newOrder2])
    })
  })
})

describe('order action creators', () => {
  let store
  const reducer = combineReducers({order})
  beforeEach(() => {
    store = createStore(reducer)
  })

  describe('getAllOrders', () => {
    it('successfully sets all orders to new order array', () => {
      store.dispatch(getAllOrders([newOrder1, newOrder2]))
      expect(store.getState().order).to.be.deep.equal([newOrder1, newOrder2])
    })
  })
})
