const router = require('express').Router();
const {Payment, PaymentAccount} = require('../db/models');
const stripe = require('./stripe');

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr});
  } else {
    res.status(200).send({success: stripeRes});
  }
};

router.get('/stripe', (req, res) => {
  res.send({message: 'Stripe Server'});
});

router.post('/stripe', (req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res));
});

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
    const id = req.params.id;
    const paymentAccount = await PaymentAccount.findByPk(id);
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
    const {name, paymentId, userId} = req.body;
    const postedPaymentAccount = {
      name: name,
      paymentId: paymentId,
      userId: userId
    };
    const newPaymentAccount = await PaymentAccount.create(postedPaymentAccount);
    if (newPaymentAccount) {
      res.json(newPaymentAccount);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const paymentAccountId = req.params.id;
    const paymentAccount = await PaymentAccount.findByPk(paymentAccountId);
    if (paymentAccount) {
      await paymentAccount.destroy();
      res.json(paymentAccount);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const paymentAccount = await PaymentAccount.findByPk(req.params.id);
    paymentAccount.type = req.body.type;
    paymentAccount.name = req.body.name;

    await paymentAccount.save();
    res.json(paymentAccount);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
