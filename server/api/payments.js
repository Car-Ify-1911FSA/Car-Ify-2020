const router = require('express').Router();

const Payments = require('../db/models/payment.js');

router.get('/', async (req, res, next) => {
  try {
    const allPayments = await Payments.findAll();
    if (allPayments) {
      res.json(allPayments);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const payment = await Payments.findByPk(id);
    if (payment) {
      res.json(payment);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newPayment = Payments.create(req.body);
    if (newPayment) {
      res.send(newPayment);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payments.findByPk(paymentId);
    if (payment) {
      await payment.destroy();
      res.send(payment);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const payment = await Payments.findByPk(id);
    payment.type = req.body.type;

    await payment.save();
    res.send(payment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
