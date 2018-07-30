/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Inventory = db.model('inventory')

describe('Inventory model', () => {
  describe('Validations', () => {
    it('requires size', async () => {
      const inventory = Inventory.build({quantity: 0})
      try {
        await inventory.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('size cannot be null')
      }
    })
    it('has minimum quantity of 0', async () => {
      const inventory = Inventory.build({size: 'Small', quantity: -1})
      try {
        await inventory.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('min on quantity failed')
      }
    })
  })
})
