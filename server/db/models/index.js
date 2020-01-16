const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Payment = require('./payment');
const PaymentAccount = require('./paymentAccount');
const CartProduct = require('./cartProduct');

Cart.belongsToMany(Product, {through: CartProduct});
Product.belongsToMany(Cart, {through: CartProduct});

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
