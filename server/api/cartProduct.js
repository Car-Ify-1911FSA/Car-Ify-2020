const router = require('express').Router();
const {CartProduct} = require('../db/models');
const {isAdmin} = require('./security');

router.get('/:cartId', isAdmin, async (req, res, next) => {
  try {
    const cartDetail = await CartProduct.findAll({
      where: {
        cartId: req.params.cartId
      }
    });
    res.send(cartDetail);
  } catch (error) {
    console.error(error);
  }
});

router.post('/', isAdmin, async (req, res, next) => {
  console.log(req.body);
  try {
    const {cartId, productId, quantity, totalPrice} = req.body;
    const newItem = {
      cartId: cartId,
      productId: productId,
      quantity: quantity,
      totalPrice: totalPrice
    };
    const newOrder = await CartProduct.create(newItem);
    res
      .status(200)
      .json({newOrder, message: 'Added new cart item successfully!'});
  } catch (error) {
    console.error(error);
  }
});

router.put('/', isAdmin, async (req, res, next) => {
  try {
    console.log('cp put -', req.body);
    await CartProduct.update(['OBJ']);
    res.status(200).send(newOrder);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
