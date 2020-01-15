const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Payment = require('./payment');
const PaymentAccount = require('./paymentAccount');
const CartProduct = require('./cartProduct');

Product.belongsToMany(Cart, {through: 'cartProduct'});

Cart.belongsTo(User);

Cart.belongsTo(PaymentAccount);
PaymentAccount.belongsTo(Payment);

module.exports = {
  User,
  Product,
  Cart,
  Payment,
  PaymentAccount,
  CartProduct
};
