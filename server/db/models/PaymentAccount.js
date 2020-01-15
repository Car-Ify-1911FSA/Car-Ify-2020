const Sequelize = require('sequelize');
const db = require('../db');

const PaymentAccounts = db.define('payment_accounts', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = PaymentAccounts;
