/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe('Cart model', () => {
  describe('Default Value', () => {
    it('default quantity is 0', async () => {
      const cart = await Cart.create()
      expect(cart.quantity).to.equal(0)
    })
  })
})
