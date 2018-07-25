const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  inventoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingCity: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingState: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingZip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  orderStatus: {
    type: Sequelize.STRING
  }
})

module.exports = Order
