const Sequelize = require('sequelize')
const db = require('../db')

const OrderInventory = db.define('orderInventory', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderInventory
