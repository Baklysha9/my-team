import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { registerValidation } from './validation/auth.js'
import { validationResult } from 'express-validator'
import UserModel from './models/User.js'
import checkAuth from './utils/checkAuth.js'

mongoose
  .connect('mongodb+srv://admin:2hhsHGT7@cluster0.hzbweru.mongodb.net/my-team?retryWrites=true&w=majority')
  .then(() => console.log('DB connect'))
  .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.post('/auth/me', checkAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден'
      })
    }
    const { passwordHash, ...userData } = user._doc

    res.json(...userData)
  } catch (err) {
    console.log('auth/me error - ', err)
    res.status(403).json({
      message: 'Нет доступа'
    })
  }
})

app.post('/auth/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
      return req.status(404).json({
        message: 'Пользователь не найден'
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

    if (!isValidPass) {
      return res.status(404).json({
        message: 'Неверный логин или пароль'
      })
    }

    const token = jwt.sign({
      _id: user._id
    },
    'secretFromMyTeam', {
      expiresIn: '10d'
    })

    console.log(user._doc)
    const { passwordHash, ...userData } = user._doc

    res.json(...userData, token)
  } catch (e) {
    res.status(500).json({
      message: 'Не удалось авторизоваться'
    })
  }
})

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json(err.array())
    }

    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash
    })

    const user = await doc.save()
    const token = jwt.sign({
      _id: user._id
    },
    'secretFromMyTeam', {
      expiresIn: '10d'
    })

    const { passwordHash, ...userData } = user._doc

    res.json(...userData, token)
  } catch (err) {
    console.log('register error - ', err)
    res.status(500).json({
      message: 'Не удалось зарегистрироваться'
    })
  }
})

app.listen(9999, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})
