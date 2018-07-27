const router = require('express').Router()
const {Cart, Inventory, Product} = require('../db/models')

router.put('/add', async (req, res, next) => {
  try {
    if (req.body.inventoryId) {
      const cartProduct = await Cart.findOrCreate({
        where: {
          userId: req.body.userId,
          inventoryId: req.body.inventoryId
        }
      })
      await cartProduct[0].increment('quantity', {
        by: req.body.quantity
      })
    }
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

router.put('/reduce', async (req, res, next) => {
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
