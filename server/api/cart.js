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
    next(error);
  }
});
// isUserOrAdmin,
router.post('/:userId', async (req, res, next) => {
  try {
    const {status, time, userId, paymentAccountId} = req.body;
    const newCart = {
      status: status,
      time: time,
      userId: userId
    };
    if (paymentAccountId) {
      newCart.paymentAccountId = paymentAccountId;
    }
    const newOrder = await Cart.create(newCart);
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
