const router = require('express').Router();
const {Cart, Product} = require('../db/models');
const {isAdmin, isUserOrAdmin} = require('./security');

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

router.post('/', isAdmin, async (req, res, next) => {
  try {
    console.log('cart post -', req.body);
    const newOrder = await Cart.create(req.body);
    res.send(newOrder);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
