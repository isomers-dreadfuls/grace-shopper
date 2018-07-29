const router = require('express').Router()
const stripe = require('stripe')('NEED TO ADD SK CODE HERE !!!!!!!!!!')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body.id
    })
    res.json(status)
  } catch (error) {
    next(error)
  }
})
