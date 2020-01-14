const Sequelize = require('sequelize')
const db = require('../db')
const Payments = db.define('payments', {
  type: {
    type: Sequelize.ENUM('visa', 'paypal', 'stripe')
  }
})
module.exports = Payments
