/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe('Cart model', () => {
  describe('Validations', () => {
    it('requires user', async () => {
      const cart = Cart.build();

      try {
        await cart.validate()
        throw Error('validation was successful but should have failed without `name`');
      }
      catch (err) {
        expect(err.message).to.contain('user cannot be null');
      }
    });

    it('requires quantity', async () => {
      const cart = Cart.build();

      try {
        await cart.validate()
        throw Error('validation was successful but should have failed without `quantity`');
      }
      catch (err) {
        expect(err.message).to.contain('quantity cannot be null');
      }
    });

    it('requires inventory', async () => {
      const cart = Cart.build();

      try {
        await cart.validate()
        throw Error('validation was successful but should have failed without `inventory`');
      }
      catch (err) {
        expect(err.message).to.contain('inventory cannot be null');
      }
    });
  });
});