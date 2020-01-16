const router = require('express').Router();
const {Cart, Product} = require('../db/models');

router.get('/:userId', async (req, res, next) => {
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

router.post('/:userId', async (req, res, next) => {
  try {
    const newOrder = await Cart.create(req.body);
    res.send(newOrder);
  } catch (error) {
    console.error(error);
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    //find order
    //update order
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
