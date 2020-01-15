const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/payments', require('./payments'))
router.use('/payment-accounts', require('./paymentAccounts'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
