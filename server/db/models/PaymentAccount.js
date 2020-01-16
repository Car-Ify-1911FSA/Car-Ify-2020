const Sequelize = require('sequelize');
const db = require('../db');

const PaymentAccounts = db.define('paymentAccounts', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = PaymentAccounts;
