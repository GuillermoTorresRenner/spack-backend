import jwt, { JwtPayload } from 'jsonwebtoken'
import { NotFoundError } from '../errors/customError'
import { Users } from '@prisma/client'
export const generateToken = (user: Users): string => {
  if (process.env.JWT_SECRET == null) {
    throw new NotFoundError('JWT_SECRET no está definido en las variables de entorno')
  }

  return jwt.sign({ id: user.userID }, process.env.JWT_SECRET, { expiresIn: '2d' })
}

export const verifyToken = (token: string): JwtPayload => {
  if (process.env.JWT_SECRET == null) {
    throw new NotFoundError('JWT_SECRET no está definido en las variables de entorno')
  }

  return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
}
