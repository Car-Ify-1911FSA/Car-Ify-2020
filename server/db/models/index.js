const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Payment = require('./payment')
const PaymentAccount = require('./paymentAccount')

Order.belongsTo(User)
Product.hasMany(Order)
PaymentAccount.hasOne(Order)

PaymentAccount.belongsTo(Payment)

module.exports = {
  User,
  Product,
  Order,
  Payment,
  PaymentAccount
}
