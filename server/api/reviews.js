const router = require('express').Router()
const {Product, Inventory, Review, User} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    const newReview = await Review.create({
      rating: req.body.rating,
      reviewText: req.body.reviewText,
      userId: req.body.userId,
      productId: req.body.productId
    })
    const product = await Product.findById(newReview.productId, {
      include: [Inventory, {model: Review, include: [User]}]
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})
