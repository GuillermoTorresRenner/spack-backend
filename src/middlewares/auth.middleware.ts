// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../errors/customError'
import { UserService } from '../services/users.service'
import { UsersRepository } from '../repositories/users.repository'
import logger from '../errors/logger'

interface JwtPayload {
  id: string
}

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token

  if (token === null || token === undefined) {
    return res.status(401).json({ message: 'No autorizado, token no proporcionado' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    if (!decoded) throw new UnauthorizedError('Token no válido')

    const userService = new UserService(new UsersRepository())
    const role = await userService.getRoleByID(decoded.id)
    if (role == null) throw new UnauthorizedError('Usuario no encontrado')

    req.userID = decoded.id
    req.userRole = role

    next()
    return null
  } catch (error: any) {
    logger.error(`${new Date().toLocaleDateString()} | Error Type: ${error.name} | Status Code: ${403} | Message: ${error.message} | Stack: ${error.stack}`)
    return res.status(403).json({ message: 'Token no válido' })
  }
}
