const router = require('express').Router()
module.exports = router

router.use('/users', require('./userRouter'))
router.use('/products', require('./products'))
router.use('/reviews', require('./reviews'))
router.use('/carts', require('./carts'))
router.use('/stripe', require('./stripe'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
