const router = require('express').Router()
const {Product, Inventory, Review, User} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    // create a new review instance
    const newReview = await Review.create({
      rating: req.body.rating,
      reviewText: req.body.reviewText,
      userId: req.body.userId,
      productId: req.body.productId
    })
    // find the product for which the review was created, and send that product back
    // include the Inventory as well as the Review (the Review itself also includes the user who wrote it)
    const product = await Product.findById(newReview.productId, {
      include: [Inventory, {model: Review, include: [User]}]
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})
