const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({where: {userId: req.params.id}})
    if(req.user.id == req.params.id || req.user.isAdmin) {
      res.json(orders)
    }

    else {
      res.json("ACCESS DENIED")
    }

  } catch (error) {
    next(error)
  }
})
