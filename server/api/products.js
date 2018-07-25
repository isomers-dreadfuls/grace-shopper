const router = require('express').Router()
const {Product, Inventory, Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId, {
      include: [Inventory, Review]
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})