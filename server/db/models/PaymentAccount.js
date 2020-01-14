const Sequelize = require('sequelize')
const db = require('../db')

const PaymentAccounts = db.define('payment_accounts', {
  type: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  }
})

module.exports = PaymentAccounts
