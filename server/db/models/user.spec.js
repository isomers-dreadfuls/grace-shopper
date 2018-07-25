/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('user model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {

    let test
  
    beforeEach(async () => {
      test = await User.create({
        firstName: "Ray",
        lastName: "Lee",
        email: "lee31@cooper.edu",
        userAddress: "Somewhere",
        userCity: "over",
        userState: "the Rainbow",
        userZip: 12345,
        isAdmin: true
      })
    })
// CORRECT LATER
  //   it('sets fullName attribute', () => {
  //     expect(test.fullName.to.be.equal("Ray Lee"));
  //   })
  })

})
