const express = require('express')
const { registerController, getUsersController, loginController, updateUserController, requireSignIn } = require('../controlls/userController')

const router= express.Router()

router.post('/register', registerController)

router.post('/login', loginController)

router.put('/update-user',requireSignIn, updateUserController )

// GET route to retrieve users
router.get('/users', getUsersController);
  

module.exports= router