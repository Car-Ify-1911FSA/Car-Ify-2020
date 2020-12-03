const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['active', 'paid', 'shipped', 'complete']]
    }
  },
  time: {
    type: Sequelize.DATE
  }
});

console.log(Cart, 'cart');

module.exports = Cart;
