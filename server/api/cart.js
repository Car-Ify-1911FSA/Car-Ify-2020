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
    const newOrder = await Cart.create(req.body);
    res.send(newOrder);
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
});

module.exports = router;
