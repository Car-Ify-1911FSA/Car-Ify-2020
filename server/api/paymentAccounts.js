const router = require('express').Router()

const PaymentAccounts = require('../db/models/paymentAccount.js')
const {Payment} = require('../db/models/')

router.get('/', async (req, res, next) => {
  try {
    const allPaymentAccounts = await PaymentAccounts.findAll({
      include: [{model: Payment}]
    })
    if (allPaymentAccounts) {
      res.json(allPaymentAccounts)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    let paymentAccount = await PaymentAccounts.findByPk(id)
    if (paymentAccount) {
      res.json(paymentAccount)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let newPaymentAccount = PaymentAccounts.create(req.body)
    if (newPaymentAccount) {
      res.send(newPaymentAccount)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let paymentAccountId = req.params.id
    let paymentAccount = await PaymentAccounts.findByPk(paymentAccountId)
    if (paymentAccount) {
      await paymentAccount.destroy()
      res.send(paymentAccount)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    let paymentAccount = await PaymentAccounts.findByPk(id)
    paymentAccount.type = req.body.type
    paymentAccount.name = req.body.name

    await paymentAccount.save()
    res.send(paymentAccount)
  } catch (error) {
    next(error)
  }
})

module.exports = router
