const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id) //ADD USER'S ORDERS WHEN POSSIBLE
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put(":/id", async (req, res, next) => {
  try {
    console.log("HIT ROUTER!")
    const edit = req.body
    const update = await User.update(edit, {
      where: {
        id: req.params.id
      }
    })
    res.json(update)
  } catch (error) {
    next(error)
  }
})

module.exports = router
