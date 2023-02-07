import { body } from 'express-validator'

export const taskCreateValidation = [
  body('title', 'Укажите название (минимум 3 символа)').isLength({ min: 3 }),
  body('description', 'Укажите описание (минимум 3 символа)').isLength({ min: 3 }),
  body('user', 'Укажите статус (минимум 3 символа)').isLength({ min: 3 }),
  body('executer', 'Укажите статус (минимум 3 символа)').isLength({ min: 3 }),
  body('status', 'Укажите статус (минимум 3 символа)').isLength({ min: 3 })
]
