const router = require('express').Router();
const {Cart, Product} = require('../db/models');
const {isUserOrAdmin} = require('./security');

router.get('/:userId', isUserOrAdmin, async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{model: Product}]
    });
    res.send(cart);
  } catch (error) {
    console.error(error);
  }
});

router.post('/:userId', isUserOrAdmin, async (req, res, next) => {
  try {
    console.log('cart post -', req.body);
    const {status, time, userId, paymentAccountId} = req.body;
    const newCart = {
      status: status,
      time: time,
      userId: userId,
      paymentAccountId: paymentAccountId
    };
    const newOrder = await Cart.create(newCart);
    res.send(newOrder);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
