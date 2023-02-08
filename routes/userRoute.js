const express = require('express')
const {register, login } = require('../controller/userController')
const {checkUser} = require('../middleware/authMiddleware')
const userRouter = express.Router()




userRouter.post('/check', checkUser)
userRouter.post('/register', register)
userRouter.post('/login', login)



module.exports = userRouter