
const User = require('./user')
const Product = require('./product')
const Payment = require('./payment')
const Order = require('./order')
const Review = require('./review')
const Inventory = require('./inventory')

Product.hasMany(Inventory)
Inventory.belongsTo(Product)

Product.hasMany(Review)
Review.belongsTo(Product)

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsTo(Payment)
Payment.hasMany(Order)

Order.belongsToMany(Inventory, {through: 'order_inventory'})
Inventory.belongsToMany(Order, {through: 'order_inventory'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {

  User,
  Product,
  Payment,
  Order,
  Review,
  Inventory
}
