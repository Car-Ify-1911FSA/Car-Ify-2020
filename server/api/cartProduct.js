const router = require('express').Router();
const {CartProduct} = require('../db/models');
// const {isAdmin} = require('./security');

router.get('/:cartId', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
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

router.put('/', async (req, res, next) => {
  try {
    const {
      cartId,
      productId,
      quantity: newQuantity,
      totalPrice: newPrice
    } = req.body;
    const product = await CartProduct.findOne({
      where: {
        cartId: cartId,
        productId: productId
      }
    });
    await product.update({
      quantity: product.quantity + newQuantity,
      totalPrice: product.totalPrice + newPrice
    });
    res.status(200).json({product, message: 'Edited cart item successfully!'});
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
