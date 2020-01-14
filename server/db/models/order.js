const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  cartId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
