const router = require('express').Router();
const {CartProduct, Product} = require('../db/models');
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
    next(error);
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
    next(error);
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
    next(error);
  }
});

router.delete('/:cartId/:productId', async (req, res, next) => {
  try {
    await CartProduct.destroy({
      where: {
        cartId: req.params.cartId,
        productId: req.params.productId
      }
    });
    const cartDetail = await CartProduct.findAll({
      where: {
        cartId: req.params.cartId
      }
    });
    res
      .status(200)
      .json({cartDetail, message: 'Deleted cart item successfully!'});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
