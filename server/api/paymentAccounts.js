const router = require('express').Router();
const {Payment, PaymentAccount} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const allPaymentAccounts = await PaymentAccount.findAll({
      include: [{model: Payment}]
    });
    if (allPaymentAccounts) {
      res.json(allPaymentAccounts);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let paymentAccount = await PaymentAccount.findByPk(id);
    if (paymentAccount) {
      res.json(paymentAccount);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let newPaymentAccount = PaymentAccount.create(req.body);
    if (newPaymentAccount) {
      res.send(newPaymentAccount);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    let paymentAccountId = req.params.id;
    let paymentAccount = await PaymentAccount.findByPk(paymentAccountId);
    if (paymentAccount) {
      await paymentAccount.destroy();
      res.send(paymentAccount);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let paymentAccount = await PaymentAccount.findByPk(id);
    paymentAccount.type = req.body.type;
    paymentAccount.name = req.body.name;

    await paymentAccount.save();
    res.send(paymentAccount);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
