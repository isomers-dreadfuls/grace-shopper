/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Inventory model', () => {
  describe('Validations', () => {
    it('requires name', async () => {
      const product = Product.build({
        price: 100,
        image: 'test',
        description: 'test'
      })
      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })
    it('requires price', async () => {
      const product = Product.build({
        name: 'test',
        image: 'test',
        description: 'test'
      })
      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('price cannot be null')
      }
    })
    it('requires image', async () => {
      const product = Product.build({
        name: 'test',
        price: 100,
        description: 'test'
      })
      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('image cannot be null')
      }
    })
    it('requires description', async () => {
      const product = Product.build({name: 'test', price: 100, image: 'test'})
      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('description cannot be null')
      }
    })
  })
})
