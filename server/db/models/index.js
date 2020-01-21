const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Payment = require('./payment');
const PaymentAccount = require('./PaymentAccount');
const CartProduct = require('./cartProduct');

Cart.belongsToMany(Product, {
  through: {model: CartProduct}
  // through: {model: CartProduct, constraint: false},
  // unique: false
});
Product.belongsToMany(Cart, {
  through: {model: CartProduct}
  // through: {model: CartProduct, constraint: false},
  // unique: false
});

Cart.belongsTo(User);
Cart.belongsTo(PaymentAccount);

PaymentAccount.belongsTo(Payment);
PaymentAccount.belongsTo(User);

module.exports = {
  User,
  Product,
  Cart,
  Payment,
  PaymentAccount,
  CartProduct
};
