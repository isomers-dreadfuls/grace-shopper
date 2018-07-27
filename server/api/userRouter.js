const router = require('express').Router()
const {User, Cart, Inventory, Product} = require('../db/models')

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
        userId: req.body.userId,
        inventoryId: req.body.inventoryId
      }
    })
    await cartProduct[0].update({
      quantity: req.body.quantity
    })
    const newCart = await Cart.findAll({
      where: {
        userId: req.body.userId
      },
      include: [
        {
          model: Inventory,
          include: [{model: Product}]
        }
      ]
    })
    res.send(newCart)
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
      },
      include: [{model: Inventory, include: [Product]}]
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
