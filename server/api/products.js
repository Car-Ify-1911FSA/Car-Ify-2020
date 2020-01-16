const router = require('express').Router();
const {Product} = require('../db/models');
const {isAdmin, isUserOrAdmin} = require('./security');

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
