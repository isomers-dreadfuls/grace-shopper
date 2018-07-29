const router = require('express').Router()
const {Cart, Inventory, Product} = require('../db/models')

const cartFromDb = userId =>
  Cart.findAll({
    where: {
      userId: userId
    },
    include: [
      {
        model: Inventory,
        include: [{model: Product}]
      }
    ]
  })

const findFromDb = (userId, inventoryId) =>
  Cart.findOrCreate({
    where: {
      userId: userId,
      inventoryId: inventoryId
    }
  })

router.put('/add', async (req, res, next) => {
  try {
    if (req.body.inventoryId) {
      const cartProduct = await findFromDb(
        req.body.userId,
        req.body.inventoryId
      )
      await cartProduct[0].increment('quantity', {
        by: req.body.quantity
      })

      //this is very temporary, to be reviewed by team for full implementation
      //set cart cookie
      res.cookie(
        'cart',
        `s=${req.session.id}&i=${req.body.inventoryId}&q=${req.body.quantity}`,
        {path: '/'}
      )
    }
    const newCart = await cartFromDb(req.body.userId)
    res.send(newCart)
  } catch (error) {
    next(error)
  }
})

router.put('/edit', async (req, res, next) => {
  try {
    if (req.body.inventoryId) {
      const cartProduct = await findFromDb(
        req.body.userId,
        req.body.inventoryId
      )
      await cartProduct[0].update({
        quantity: req.body.quantity
      })
    }
    const newCart = await cartFromDb(req.body.userId)
    res.send(newCart)
  } catch (error) {
    next(error)
  }
})

router.put('/delete', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        userId: req.body.userId,
        inventoryId: req.body.inventoryId
      }
    })
    const newCart = await cartFromDb(req.body.userId)
    res.send(newCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
