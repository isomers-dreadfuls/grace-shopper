const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    console.log(req.user)
    if(req.user.isAdmin) {
      const users = await User.findAll()
      res.json(users)
    } 
    else {
      res.status(500).send("Access Denied")
    }
  } catch (error) {
    res.json("ACCESS DENIED")
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id) //ADD USER'S ORDERS WHEN POSSIBLE
    if(user.isAdmin){
      res.json(user)
    }
    else { 
      const filteredUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        googleId: user.googleId,
        userAddress: user.userAddress,
        userCity: user.userCity,
        userState: user.userState,
        userZip: user.userZip,
      }
      res.json(filteredUser) 
    }
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
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
