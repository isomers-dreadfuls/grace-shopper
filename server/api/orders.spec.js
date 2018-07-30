/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request(app)
const Order = db.model('order')
const User = db.model('user')
const Inventory = db.model('inventory')
const Product = db.model('product')

describe('Order routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    await User.create({email: 'test@test.com', password: 'test'})
    await Product.create({
      name: 'test1 sweater',
      price: 10,
      image: 'testimage1.jpg',
      description: 'test1 description'
    })
    const inventory = await Inventory.create({
      size: 'Medium',
      quantity: 10,
      productId: 1
    })
    const order = await Order.create({
      price: 1000,
      shippingAddress: 'test1',
      shippingCity: 'test1',
      shippingState: 'test1',
      shippingZip: 11111,
      orderStatus: 'placed',
      userId: 1
    })
    order.addInventories(inventory)
  })
  describe('get /api/orders/:id', () => {
    it('gets all products', async () => {
      const response = await agent.get('/api/orders/1').expect(200)
      expect(response.body).to.have.length(1)
      expect(response.body[0].id).to.equal(1)
    })
  })
})
