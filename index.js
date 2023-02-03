import express from 'express'
import mongoose from 'mongoose'
import { loginValidation, registerValidation } from './validation/auth.js'
import checkAuth from './utils/checkAuth.js'
import * as userController from './controllers/userController.js'

mongoose
  .connect('mongodb+srv://admin:2hhsHGT7@cluster0.hzbweru.mongodb.net/my-team?retryWrites=true&w=majority')
  .then(() => console.log('DB connect'))
  .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.get('/auth/me', checkAuth, userController.getMe())

app.post('/auth/login', loginValidation, userController.login)

app.post('/auth/register', registerValidation, userController.register)

app.listen(9999, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})
