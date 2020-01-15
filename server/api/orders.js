const router = require('express').Router()
const {Order} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.send(newOrder)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
