const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  user: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = Cart
