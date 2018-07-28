const router = require('express').Router()
const stripe = require('stripe')('sk_test_TwTTlid3GeOG6YPydOjARw4I')
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
