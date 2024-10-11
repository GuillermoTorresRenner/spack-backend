
import { body } from 'express-validator'

export const ValidationRegisterRules = [
  body('rut').notEmpty().withMessage('El RUT es obligatorio.'),
  body('name').notEmpty().withMessage('El nombre es obligatorio.'),
  body('surname').notEmpty().withMessage('El apellido es obligatorio.'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
]
export const ValidationLoginRules = [
  body('rut').notEmpty().withMessage('El RUT es obligatorio.'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
]
