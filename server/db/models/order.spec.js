/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  describe('Validations', () => {
    it('price not empty', async () => {
      const order = Order.build({
        shippingAddress: 'test',
        shippingCity: 'test',
        shippingState: 'test',
        shippingZip: 11111,
        orderStatus: 'test'
      })
      try {
        await order.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('price cannot be null')
      }
    })
    it('requires shippingAddress', async () => {
      const order = Order.build({
        price: 100,
        shippingCity: 'test',
        shippingState: 'test',
        shippingZip: 11111,
        orderStatus: 'test'
      })
      try {
        await order.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('shippingAddress cannot be null')
      }
    })
    it('requires shippingCity', async () => {
      const order = Order.build({
        price: 100,
        shippingAddress: 'test',
        shippingState: 'test',
        shippingZip: 11111,
        orderStatus: 'test'
      })
      try {
        await order.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('shippingCity cannot be null')
      }
    })
    it('requires shippingState', async () => {
      const order = Order.build({
        price: 100,
        shippingAddress: 'test',
        shippingCity: 'test',
        shippingZip: 11111,
        orderStatus: 'test'
      })
      try {
        await order.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('shippingState cannot be null')
      }
    })
    it('requires shippingZip', async () => {
      const order = Order.build({
        price: 100,
        shippingAddress: 'test',
        shippingCity: 'test',
        shippingState: 'test',
        orderStatus: 'test'
      })
      try {
        await order.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('shippingZip cannot be null')
      }
    })
  })
})
