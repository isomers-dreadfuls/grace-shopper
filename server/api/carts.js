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
    if (req.body.userId) {
      if (req.body.inventoryId) {
        const cartProduct = await findFromDb(
          req.body.userId,
          req.body.inventoryId
        )
        await cartProduct[0].increment('quantity', {
          by: req.body.quantity
        })
      }
      const newCart = await cartFromDb(req.body.userId)
      res.send(newCart)
    } else {
      const oldCookie = req.cookies ? req.cookies.cart : {}
      const newCart = []
      let previousQuantity = 0
      for (let key in oldCookie) {
        if (key === req.body.inventoryId) {
          previousQuantity = +oldCookie[key]
        } else {
          const inventory = await Inventory.findOne({
            where: {id: key},
            include: [{model: Product}]
          })
          newCart.push({inventoryId: key, quantity: oldCookie[key], inventory})
        }
      }
      if (req.body.inventoryId) {
        const inventory = await Inventory.findOne({
          where: {id: req.body.inventoryId},
          include: [{model: Product}]
        })
        newCart.push({
          inventory,
          inventoryId: req.body.inventoryId,
          quantity: +req.body.quantity + previousQuantity
        })
      }
      const newCookie = {}
      newCart.forEach(item => {
        newCookie[item.inventoryId] = item.quantity
      })
      res.cookie('cart', newCookie)
      res.send(newCart)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.put('/edit', async (req, res, next) => {
  try {
    if (req.body.userId) {
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
    } else {
      const oldCookie = req.cookies ? req.cookies.cart : {}
      const newCart = []
      for (let key in oldCookie) {
        if (key !== req.body.inventoryId) {
          const inventory = await Inventory.findOne({
            where: {id: key},
            include: [{model: Product}]
          })
          newCart.push({inventoryId: key, quantity: oldCookie[key], inventory})
        }
      }
      if (req.body.inventoryId) {
        const inventory = await Inventory.findOne({
          where: {id: req.body.inventoryId},
          include: [{model: Product}]
        })
        newCart.push({
          inventory,
          inventoryId: req.body.inventoryId,
          quantity: req.body.quantity
        })
      }
      const newCookie = {}
      newCart.forEach(item => {
        newCookie[item.inventoryId] = item.quantity
      })
      res.cookie('cart', newCookie)
      res.send(newCart)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/delete', async (req, res, next) => {
  try {
    if (req.body.userId) {
      await Cart.destroy({
        where: {
          userId: req.body.userId,
          inventoryId: req.body.inventoryId
        }
      })
      const newCart = await cartFromDb(req.body.userId)
      res.send(newCart)
    } else {
      const oldCookie = req.cookies ? req.cookies.cart : {}
      const newCart = []
      for (let key in oldCookie) {
        if (key !== req.body.inventoryId) {
          const inventory = await Inventory.findOne({
            where: {id: key},
            include: [{model: Product}]
          })
          newCart.push({inventory, inventoryId: key, quantity: oldCookie[key]})
        }
      }
      const newCookie = {}
      newCart.forEach(item => {
        newCookie[item.inventoryId] = item.quantity
      })
      res.cookie('cart', newCookie)
      res.send(newCart)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
