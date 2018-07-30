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
    const cartArray = []
    if (req.body.inventoryId) {
      const cartProduct = await findFromDb(
        req.body.userId,
        req.body.inventoryId
      )
      await cartProduct[0].increment('quantity', {
        by: req.body.quantity
      })

      // THIS IS NOT QUITE RIGHT - IT SETS THE COOKIE TO ONLY THE LATEST ITEM
      if (cartProduct.length) {
        cartArray.push({
          i: cartProduct[0].inventoryId,
          q: cartProduct[0].quantity
        })
        res.cookie('cart', JSON.stringify(cartArray))
      }
    }
    const newCart = await cartFromDb(req.body.userId)
    if (newCart.length) {
      //update cart cookie with inventory and quantity
      newCart.map(item => {
        cartArray.push({i: item.inventoryId, q: item.quantity})
      })
      res.cookie('cart', JSON.stringify(cartArray))
    }
    res.send(newCart)
  } catch (error) {
    console.log(error)
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
    if (newCart) {
      //update cart cookie with inventory and quantity
      const cartArray = []
      newCart.map(item => {
        cartArray.push({i: item.inventoryId, q: item.quantity})
      })
      res.cookie('cart', JSON.stringify(cartArray))
    }
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
