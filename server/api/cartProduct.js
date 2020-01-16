const router = require('express').Router();
const {CartProduct} = require('../db/models');

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

module.exports = router;
