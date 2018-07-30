const router = require('express').Router()
const {Cart, Inventory, Product} = require('../db/models')

// function for finding the Cart instances for a specific user Id
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

// function for checking if Cart instance exists with the provided userId and inventory id
// if it doesn't exist, create a new instance and return it
// otherwise, find it and return it
const findFromDb = (userId, inventoryId) =>
  Cart.findOrCreate({
    where: {
      userId: userId,
      inventoryId: inventoryId
    }
  })

// Add, Edit, and Delete routes all send back cart arrays

router.put('/add', async (req, res, next) => {
  try {
    // Checks if user is logged in
    if (req.body.userId) {
      // if an inventory id is provided, then user is adding item to their cart
      if (req.body.inventoryId) {
        // *see helper functions above
        const cartProduct = await findFromDb(
          req.body.userId,
          req.body.inventoryId
        )
        await cartProduct[0].increment('quantity', {
          by: req.body.quantity
        })
      }
      // *see helper functions above
      const newCart = await cartFromDb(req.body.userId)
      res.send(newCart)
      // If user is NOT logged in, then cart is dealt with through cookies
    } else {
      // retrieve previous cookie, or if it doesn't exist set it to an empty object
      const oldCookie = req.cookies ? req.cookies.cart : {}
      const newCart = []
      let previousQuantity = 0
      // for each key in the cookie (which corresponds to inventoryId), create a cart item
      // this cart item will have an inventoryId set to the key, and a quantity set to that key's value
      // UNLESS the key is equal to the req.body.inventoryId, which is the id of the current product being updated
      // in that case, only store the previous quantity into the 'previousQuantity' variable
      for (let key in oldCookie) {
        if (key === req.body.inventoryId) {
          previousQuantity = +oldCookie[key]
        } else {
          // this finds the inventory instance, including the product instance, for each new temp cart object created
          const inventory = await Inventory.findOne({
            where: {id: key},
            include: [{model: Product}]
          })
          // push each created object into the 'newCart' array
          newCart.push({inventoryId: key, quantity: oldCookie[key], inventory})
        }
      }
      // if an inventory id is provided, create a new object for this id as well
      // the quantity of this object will be the provided req.body.quantity PLUS the stored 'previousQuantity' variable, which we set earlier
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
      // create a new cookie object, which will store the new key (inventoryId) and value (quantity) pairs
      const newCookie = {}
      // for each item in the newCart, convert it into keys and values for the cookie object
      newCart.forEach(item => {
        newCookie[item.inventoryId] = item.quantity
      })
      // send the cookie object back to the client (for storage)
      res.cookie('cart', newCookie)
      // send the actual cart back to the client (for rendering)
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
        // *see helper functions above
        const cartProduct = await findFromDb(
          req.body.userId,
          req.body.inventoryId
        )
        await cartProduct[0].update({
          quantity: req.body.quantity
        })
      }
      // *see helper functions above
      const newCart = await cartFromDb(req.body.userId)
      res.send(newCart)
    } else {
      // this section is the same as in the add route, except for one difference
      // there is no saved 'previousQuantity' variable
      // that is because this route is when the client is updating the cart item's quantity
      // therefore, just set the new quantity directly to JUST the provided req.body.quantity
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
        // here, the newly updated item has its quantity directly set to the new req.body.quantity
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
      // *see helper functions above
      const newCart = await cartFromDb(req.body.userId)
      res.send(newCart)
    } else {
      // this section is the same as the add and edit routes in the way that it treats cookies
      const oldCookie = req.cookies ? req.cookies.cart : {}
      const newCart = []
      for (let key in oldCookie) {
        // for each key in the old cookie, if it matches the cookie we want to delete, then DONT push it to the new cart
        // otherwise, create each new element and push it to the newCart as normal
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
