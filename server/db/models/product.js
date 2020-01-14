const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  brand: {
    type: Sequelize.STRING
  },
  model: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.FLOAT
  },
  condition: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['new', 'used']]
    }
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
