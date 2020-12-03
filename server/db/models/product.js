const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  brand: {
    type: Sequelize.STRING
  },
  model: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.FLOAT
  },
  condition: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['New', 'Used']]
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpaOexXQpRpu85_Xz8xHnJOL6nycw-pZZ1bezgK1Fp8VptDdBk'
  },
  totalRating: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  numberRating: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

console.log(Product, typeof Product, 'product');

module.exports = Product;
