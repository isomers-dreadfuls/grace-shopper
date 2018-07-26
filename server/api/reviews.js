const router = require('express').Router()
const {Product, Inventory, Review, User} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body)
    const product = await Product.findById(newReview.productId, {
      include: [Inventory, {model: Review, include: [User]}]
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})
