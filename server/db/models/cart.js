const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  user: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Cart
