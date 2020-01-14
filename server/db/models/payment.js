const Sequelize = require('sequelize')
const db = require('../db')

const Payment = db.define('payment', {
  type: {
    type: Sequelize.STRING
  }
})

module.exports = Payment
