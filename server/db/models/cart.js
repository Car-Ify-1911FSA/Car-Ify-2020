const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  states: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['active', 'paid', 'shipped', 'complete']]
    }
  },
  time: {
    type: Sequelize.DATE
  }
});

module.exports = Cart;
