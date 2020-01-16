const Sequelize = require('sequelize');
const db = require('../db');
const {Cart, Product} = require('./index');

const CartProduct = db.define('cartProduct', {
  cartId: {
    type: Sequelize.INTEGER,
    references: {
      model: Cart,
      key: 'id'
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  totalPrice: {
    type: Sequelize.INTEGER
  }
});

module.exports = CartProduct;
