const Cart = require('./cart')
const Inventory = require('./inventory')
const Order = require('./order')
const Payment = require('./payment')
const Product = require('./product')
const Review = require('./review')
const User = require('./user')


User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Payment)
Payment.belongsTo(User)

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

User.belongsToMany(Inventory, {through: Cart})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Cart,
  Inventory,
  Order,
  Payment,
  Product,
  Review,
  User
}
