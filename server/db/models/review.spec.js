/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Inventory model', () => {
  describe('Validations', () => {
    it('review rating cannot be less than 0', async () => {
      const review = Review.build({
        rating: -1,
        reviewText: 'test'
      })
      try {
        await review.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('min on rating failed')
      }
    })
    it('review rating cannot be greater than 5', async () => {
      const review = Review.build({
        rating: 6,
        reviewText: 'test'
      })
      try {
        await review.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('max on rating failed')
      }
    })
    it('requires reviewText', async () => {
      const review = Review.build({
        rating: 5
      })
      try {
        await review.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('reviewText cannot be null')
      }
    })
  })
})
