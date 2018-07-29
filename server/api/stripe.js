const router = require('express').Router()
const stripe = require('stripe')('sk_test_TwTTlid3GeOG6YPydOjARw4I')
const {Inventory, Cart, Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    // need to check inventory
    let checkoutCart = await Cart.findAll({where: {userId: req.body.userId}})
    let inventoryArray = []
    let inventoryCheck = checkoutCart.every(async item => {
      const inventoryEntry = await Inventory.findById(item.inventoryId)
      inventoryArray.push(inventoryEntry)
      return inventoryEntry.quantity >= item.quantity
    })
    if (!inventoryCheck) {
      throw new Error('Inventory not enough')
    }
    await stripe.charges.create({
      amount: 100 * parseInt(req.body.amount, 10),
      currency: 'usd',
      description: 'An example charge',
      source: req.body.id
    })
    let newOrder = await Order.create({
      shippingAddress: 'test',
      shippingCity: 'test',
      shippingState: 'test',
      shippingZip: 11111,
      price: 100 * parseInt(req.body.amount, 10),
      userId: req.body.userId,
      orderStatus: 'placed'
    })
    inventoryArray.forEach(async item => {
      const result = checkoutCart.filter(
        cartItem => cartItem.inventoryId === item.id
      )
      const quantity = result[0].quantity
      await item.decrement('quantity', {
        by: quantity
      })
      for (let i = 0; i < quantity; i++) {
        await newOrder.addInventories(item)
      }
    })
    await Cart.destroy({
      where: {
        userId: req.body.userId
      }
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
