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
    console.log('placeholder put');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
