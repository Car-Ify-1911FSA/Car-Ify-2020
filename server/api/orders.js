const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.send(allOrders)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
