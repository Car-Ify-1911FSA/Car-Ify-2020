const Sequelize = require('sequelize')
const db = require('../db')

const PaymentAccounts = db.define('payment_accounts', {
  type: {
    type: Sequelize.STRING
  },
  number: {
    type: Sequelize.INTEGER
  }
})

module.exports = PaymentAccounts
