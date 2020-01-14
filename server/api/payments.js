const router = require('express').Router()

const Payments = require('../db/models/payment.js')

router.get('/', async (req, res, next) => {
  try {
    const allPayments = await Payments.findAll()
    if (allPayments) {
      res.json(allPayments)
    } else {
      res.sendSstatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id
    let payment = await Payments.findById(id)
    if (payment) {
      res.json(payment)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let newPayment = Payments.create(req.body)
    if (newPayment) {
      res.send(newPayment)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let paymentId = req.params.id
    let payment = await Payments.findById(paymentId)
    if (payment) {
      await payment.destroy()
      res.send(payment)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
