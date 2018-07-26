const router = require('express').Router()
const {User, Cart} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id) //ADD USER'S ORDERS WHEN POSSIBLE
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/addToCart', async (req, res, next) => {
  try {
    const cartProduct = await Cart.findOrCreate({
      where: {
        userId: 1,
        inventoryId: 1
      }
    })
    await cartProduct[0].increment('quantity')
    res.send(cartProduct[0])
  } catch (error) {
    next(error)
  }
})

router.put('/reduceFromCart', async (req, res, next) => {
  try {
    const cartProduct = await Cart.findOne({
      where: {
        userId: 1,
        inventoryId: 1
      }
    })
    if (cartProduct.quantity > 1) {
      await cartProduct.decrement('quantity')
    }
    res.send(cartProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
