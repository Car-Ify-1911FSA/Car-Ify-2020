const router = require('express').Router();
const {Product} = require('../db/models');
const {isAdmin} = require('./security');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const selectedProduct = await Product.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(selectedProduct);
  } catch (err) {
    next(err);
  }
});

router.put('/', isAdmin, async (req, res, next) => {
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

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const {
      brand,
      model,
      category,
      color,
      price,
      condition,
      description,
      quantity,
      imageUrl
    } = req.body;
    const newProduct = {
      brand,
      model,
      category,
      color,
      price,
      condition,
      description,
      quantity,
      imageUrl
    };
    await Product.create(newProduct);
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
