const router = require('express').Router()
const stripe = require('stripe')('sk_test_TwTTlid3GeOG6YPydOjARw4I')
const {Inventory, Cart, Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let checkoutCart = req.body.cart
    let inventoryArray = []
    // for each item in the checkout cart, find the item in the Inventory model and add it to the inventory Array
    // then, check to make sure the quantity is >= quantity requested
    let inventoryCheck = await checkoutCart.every(async item => {
      const inventoryEntry = await Inventory.findById(item.inventoryId)
      inventoryArray.push(inventoryEntry)
      return inventoryEntry.quantity >= item.quantity
    })
    // if the check is false, throw error
    if (!inventoryCheck) {
      throw new Error('Inventory not enough')
    }
    // if there is enough inventory, then create a new stripe charge
    const charge = await stripe.charges.create({
      amount: 100 * parseInt(req.body.amount, 10),
      currency: 'usd',
      description: 'An example charge',
      source: req.body.id
    })
    // if no errors so far, then create a new order instance in the database for this order
    let newOrder = await Order.create({
      shippingAddress: 'test',
      shippingCity: 'test',
      shippingState: 'test',
      shippingZip: 11111,
      price: parseInt(req.body.amount, 10),
      userId: req.body.userId,
      orderStatus: 'placed'
    })
    // once everything is successfully created, go through each item in the inventory array and reduce inventory by how much has been purchased
    inventoryArray.forEach(async item => {
      // filter the cart to find each individual item's quantity purchased
      const result = checkoutCart.filter(
        cartItem => +cartItem.inventoryId === +item.id
      )
      const quantity = result[0].quantity
      // reduce the inventory's quantity by quantity purchased
      await item.decrement('quantity', {
        by: quantity
      })
      // add inventory to the order_inventory join table
      for (let i = 0; i < quantity; i++) {
        await newOrder.addInventories(item)
      }
    })
    // finally, destroy the cart for the user. For guests, the cookies 'cart' is set to an empty object
    await Cart.destroy({
      where: {
        userId: req.body.userId
      }
    })
    res.cookie('cart', {})
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
