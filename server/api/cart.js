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
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId', isUserOrAdmin, async (req, res, next) => {
  try {
    const {status, userId, paymentAccountId} = req.body;
    const newCart = {
      status: status,
      time: Date(),
      userId: userId
    };
    if (paymentAccountId) {
      newCart.paymentAccountId = paymentAccountId;
    }
    const newOrder = await Cart.create(newCart);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

router.put('/:cartId', isUserOrAdmin, async (req, res, next) => {
  try {
    const activeCart = await Cart.findOne({
      where: {
        id: req.params.cartId
      }
    });
    const {status, paymentAccountId} = req.body;
    await activeCart.update({
      status: status,
      time: Date(),
      paymentAccountId: paymentAccountId
        ? paymentAccountId
        : activeCart.paymentAccountId
    });
    res.status(200).json({activeCart, message: 'Paid cart successfully!'});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
