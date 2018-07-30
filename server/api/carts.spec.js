/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request(app)
const Cart = db.model('cart')
const User = db.model('user')
const Inventory = db.model('inventory')
const Product = db.model('product')

describe('Cart routes', () => {
  const body = {
    inventoryId: 1,
    userId: 1,
    quantity: 1
  }
  const guestBody = {
    inventoryId: 1,
    userId: undefined,
    quantity: 1
  }
  beforeEach(async () => {
    await db.sync({force: true})
    await User.create({email: 'test@test.com', password: 'test'})
    await Product.create({
      name: 'test sweater',
      price: 10,
      image: 'testimage.jpg',
      description: 'test description'
    })
    await Inventory.create({
      size: 'Medium',
      quantity: 10,
      productId: 1
    })
    await Cart.create({
      quantity: 2,
      userId: 1,
      inventoryId: 1
    })
  })
  describe('PUT /api/carts/add', () => {
    it('adds item to cart for logged in user', async () => {
      const response = await agent
        .put('/api/carts/add')
        .send(body)
        .expect(200)
      expect(response.body).to.have.length(1)
      expect(response.body[0].inventoryId).to.equal(1)
      expect(response.body[0].userId).to.equal(1)
    })
    it('increments quantity properly for logged in user', async () => {
      const response = await agent
        .put('/api/carts/add')
        .send(body)
        .expect(200)
      expect(response.body[0].quantity).to.equal(3)
    })
    it('adds item to cart for guest', async () => {
      const response = await agent
        .put('/api/carts/add')
        .send(guestBody)
        .expect(200)
      expect(response.body).to.have.length(1)
      expect(response.body[0].inventoryId).to.equal(1)
    })
  })
  describe('PUT /api/carts/edit', () => {
    it('edits item in cart', async () => {
      const response = await agent
        .put('/api/carts/edit')
        .send(body)
        .expect(200)
      expect(response.body).to.have.length(1)
      expect(response.body[0].inventoryId).to.equal(1)
      expect(response.body[0].userId).to.equal(1)
    })
    it('changes quantity properly', async () => {
      const response = await agent
        .put('/api/carts/edit')
        .send(body)
        .expect(200)
      expect(response.body[0].quantity).to.equal(1)
    })
  })
  describe('PUT /api/carts/delete', () => {
    it('deletes item from cart', async () => {
      const response = await agent
        .put('/api/carts/delete')
        .send(body)
        .expect(200)
      expect(response.body).to.have.length(0)
    })
  })
}) // end describe('User routes')
