/* global describe beforeEach afterEach it */

import {createStore, combineReducers} from 'redux'
import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import cart, {
  addToCart,
  addToUserCart,
  editUserCart,
  deleteFromUserCart,
  checkout
} from './cart'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('cart thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('addToUserCart', () => {
    it('successfully sets new cart', async () => {
      const ids = {userId: 1, inventoryId: 1, quantity: 1}
      mockAxios.onPut('/api/carts/add').replyOnce(200, [ids])
      await store.dispatch(addToUserCart(ids))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(actions[0].newCart).to.be.deep.equal([ids])
    })
  })

  describe('editUserCart', () => {
    it('successfully edits cart', async () => {
      const ids = {userId: 1, inventoryId: 1, quantity: 1}
      mockAxios.onPut('/api/carts/edit').replyOnce(200, [{...ids, quantity: 2}])
      await store.dispatch(editUserCart(ids))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(actions[0].newCart).to.be.deep.equal([{...ids, quantity: 2}])
    })
  })

  describe('deleteFromUserCart', () => {
    it('successfully deletes from cart', async () => {
      const ids = {userId: 1, inventoryId: 1}
      mockAxios.onPut('/api/carts/delete').replyOnce(200, [])
      await store.dispatch(deleteFromUserCart(ids))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(actions[0].newCart).to.be.deep.equal([])
    })
  })

  describe('checkout', () => {
    it('successfully lets you checkout', async () => {
      const info = {cart: [], id: 'testkey', userId: 1}
      mockAxios.onPost('/api/stripe').replyOnce(200, [])
      await store.dispatch(checkout(info))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(actions[0].newCart).to.be.deep.equal([])
    })
  })
})

describe('cart action creators', () => {
  let store
  const reducer = combineReducers({cart})
  beforeEach(() => {
    store = createStore(reducer)
  })

  describe('addToCart', () => {
    it('successfully updates new cart', () => {
      const newCart = [{quantity: 1, userId: 1, inventoryId: 1}]
      store.dispatch(addToCart(newCart))
      expect(store.getState().cart).to.be.deep.equal(newCart)
    })
  })
})
