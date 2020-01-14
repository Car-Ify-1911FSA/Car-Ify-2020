const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/payments', require('./payments'))
router.use('/payment-accounts', require('./paymentAccounts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
