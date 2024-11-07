import { Request, Response, NextFunction } from 'express'
import logger from '../errors/logger'

export const PermissionMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.userRole
      if (!roles.includes(userRole)) {
        logger.error(`${new Date().toLocaleDateString()} | Error Type: ${'Forbidden User Role'} | Status Code: ${403} | Message: ${"This user Role can't access to this resource"} `)
        return res.status(403).json({ message: 'Forbidden access' })
      }
      next()
      return null
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`${new Date().toISOString()} | Error Type: ${error.name} | Status Code: 403 | Message: ${error.message} }`)
        return res.status(403).json({ message: 'Forbidden access' })
      }
    }
  }
}
