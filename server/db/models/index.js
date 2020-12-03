const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Payment = require('./payment');
const PaymentAccount = require('./PaymentAccount');
const CartProduct = require('./cartProduct');

console.log('Creating models');

Cart.belongsToMany(Product, {
  through: {model: CartProduct}
});
Product.belongsToMany(Cart, {
  through: {model: CartProduct}
});

console.log('Creating models 2');

Cart.belongsTo(User);
Cart.belongsTo(PaymentAccount);

PaymentAccount.belongsTo(Payment);
PaymentAccount.belongsTo(User);

console.log('Creating models 3');

module.exports = {
  User,
  Product,
  Cart,
  Payment,
  PaymentAccount,
  CartProduct
};
