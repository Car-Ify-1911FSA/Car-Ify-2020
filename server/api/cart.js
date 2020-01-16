const router = require('express').Router();
const {Cart, Product, CartProduct} = require('../db/models');

router.get('/:userId', async (req, res, next) => {
  try {
    // console.log('api -', req.params);
    const allOrders = await Cart.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{model: Product}]
    });
    // console.log('api 2 -', allOrders);
    res.send(allOrders);
  } catch (error) {
    console.error(error);
  }
});

router.post('/:userId', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
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
