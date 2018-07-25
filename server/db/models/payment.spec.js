/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Payment = db.model('payment')

describe('Payment model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
}) // end describe('User model')
