import express from 'express'
import mongoose from 'mongoose'
import { loginValidation, registerValidation } from './validation/auth.js'
import { taskCreateValidation } from './validation/task.js'

import checkAuth from './utils/checkAuth.js'
import * as userController from './controllers/userController.js'
import * as taskController from './controllers/taskController.js'
import handleValidationErrors from './utils/handleValidationErrors.js'
import multer from 'multer'

mongoose
  .connect('mongodb+srv://admin:2hhsHGT7@cluster0.hzbweru.mongodb.net/my-team?retryWrites=true&w=majority')
  .then(() => console.log('DB connect'))
  .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

app.use(express.json())

app.use('/uploads', express.static('uploads'))
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

  .app.get('/auth/me', checkAuth, userController.getMe)
app.post('/auth/login', loginValidation, handleValidationErrors, userController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, userController.register)

app.post('/tasks', checkAuth, taskCreateValidation, taskController.create)
app.get('/tasks/:id', checkAuth, taskController.getOne)
app.get('/tasks', checkAuth, taskController.getAll)
app.delete('/tasks/:id', checkAuth, taskController.remove)
app.patch('/tasks/:id', checkAuth, taskController.update)

app.listen(9999, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})
