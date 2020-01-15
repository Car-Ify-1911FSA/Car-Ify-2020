const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Payment = require('./payment');
const PaymentAccount = require('./paymentAccount');
const CartProduct = require('./cartProduct');

Cart.hasMany(Product);
Product.belongsToMany(Cart, {through: 'cartProduct'});

Cart.belongsTo(User);

Cart.hasOne(PaymentAccount);
PaymentAccount.hasOne(Payment);

module.exports = {
  User,
  Product,
  Cart,
  Payment,
  PaymentAccount,
  CartProduct
};
