const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 5,
      min: 0
    }
  },
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Review
