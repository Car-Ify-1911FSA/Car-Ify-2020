const router = require('express').Router()
const {User} = require('../db/models')
const paymentAccounts = require('../db/models/paymentAccount.js')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{model: paymentAccounts}],
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router
