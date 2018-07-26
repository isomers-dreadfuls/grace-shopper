const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
})

module.exports = Cart
