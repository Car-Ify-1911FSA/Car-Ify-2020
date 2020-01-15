const router = require('express').Router()
const {Order, Product} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{model: Product}]
    })
    res.send(allOrders)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.send(newOrder)
  } catch (error) {
    console.log(error)
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    //find order
    //update order
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
