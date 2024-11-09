
import { body, param } from 'express-validator'

export const ValidationRegisterRules = [
  body('rut').notEmpty().withMessage('El RUT es obligatorio.'),
  body('name').notEmpty().withMessage('El nombre es obligatorio.'),
  body('surname').notEmpty().withMessage('El apellido es obligatorio.'),
  body('role').notEmpty().withMessage('El Rol de usuario es obligatorio'),
  body('password').notEmpty().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
]
export const ValidationLoginRules = [
  body('rut').notEmpty().withMessage('El RUT es obligatorio.'),
  body('password').notEmpty().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
]
export const ValidationNewPasswordRules = [
  body('currentPassword').notEmpty().withMessage('El password actual es obligatorio.').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),
  body('newPassword').notEmpty().withMessage('El nuevo password es obligatorio.').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
]

export const ValidateDeleteUserRules = [
  param('userIDToDelete').notEmpty().withMessage('El id del usuario a eliminar es obligartorio.')
]
export const ValidateGetUserByIdRules = [
  param('id').notEmpty().withMessage('El id del usuario es obligatorio.')
]

export const ValidationUpdateUserRules = [

  param('userIdToUpdate').notEmpty().withMessage('El id del usuario es obligatorio.'),
  body('rut'),
  body('name'),
  body('surname'),
  body('role').notEmpty().withMessage('El rol en necesario'),
  body('password')
]
