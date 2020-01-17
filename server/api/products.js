const router = require('express').Router();
const {Product} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const {productId, quantity: newQuantity} = req.body;
    const product = await Product.findByPk(productId);
    await product.update({
      quantity: product.quantity - newQuantity
    });
    const allProducts = await Product.findAll();
    res.status(200).json({allProducts, message: 'Edit products successfully!'});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
