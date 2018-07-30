/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request(app)
const Review = db.model('review')
const User = db.model('user')
const Inventory = db.model('inventory')
const Product = db.model('product')

describe('User routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    await User.create({email: 'test@test.com', password: 'test'})
    await Product.create({
      name: 'test1 sweater',
      price: 10,
      image: 'testimage1.jpg',
      description: 'test1 description'
    })
    await Inventory.create({
      size: 'Medium',
      quantity: 10,
      productId: 1
    })
    await Review.create({
      rating: 5,
      reviewText: 'test',
      userId: 1,
      productId: 1
    })
  })
  describe('get /api/products/', () => {
    it('gets all products', async () => {
      const response = await agent.get('/api/products/').expect(200)
      expect(response.body).to.have.length(1)
      expect(response.body[0].id).to.equal(1)
    })
  })
  describe('get /api/products/:productId', () => {
    it('gets one products', async () => {
      const response = await agent.get('/api/products/1').expect(200)
      expect(response.body.id).to.equal(1)
      expect(response.body.name).to.equal('test1 sweater')
      expect(response.body.inventories[0].size).to.equal('Medium')
      expect(response.body.inventories[0].productId).to.equal(1)
    })
  })
})
