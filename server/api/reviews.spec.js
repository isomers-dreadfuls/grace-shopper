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

describe('Review routes', () => {
  const body = {rating: 5, reviewText: 'test', userId: 1, productId: 1}
  beforeEach(async () => {
    await db.sync({force: true})
    await User.create({email: 'test@test.com', password: 'test'})
    await Product.create({
      name: 'test1 sweater',
      price: 10,
      image: 'testimage1.jpg',
      description: 'test1 description'
    })
  })
  describe('put /api/reviews/', () => {
    it('puts new review ', async () => {
      const response = await agent
        .put('/api/reviews/')
        .send(body)
        .expect(200)
      expect(response.body.id).to.equal(1)
      expect(response.body.name).to.equal('test1 sweater')
      expect(response.body.reviews).to.have.length(1)
      expect(response.body.reviews[0].productId).to.equal(1)
      expect(response.body.reviews[0].rating).to.equal(5)
    })
  })
})
