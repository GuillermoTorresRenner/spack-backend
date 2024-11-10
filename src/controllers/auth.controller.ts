import { Request, Response } from 'express'
import { UserService } from '../services/users.service'
import { UsersCreateDTO } from '../types/users.dto'
import {
  InternalServerError,
  NotFoundError,
  CustomError,
  UserCreatedError
} from '../errors/customError'
import { comparePassword, expiredPassword } from '../utils/passwords'
import { generateToken } from '../validations/token'

export class AuthController {
  private readonly userService = new UserService()

  public async register (req: Request, res: Response): Promise<Response> {
    try {
      const user: UsersCreateDTO = req.body
      const isUserRegistered = await this.userService.getUserByRutEvenInactive(
        user.rut
      )
      if (isUserRegistered !== null) {
        if (isUserRegistered.isActive === false) {
          throw new UserCreatedError('Usuario ya registrado e inactivo en sistema')
        } else {
          throw new UserCreatedError('Usuario ya registrado')
        }
      }

      const createdUser = await this.userService.createUser(user)
      if (createdUser == null) {
        throw new InternalServerError('Error creando al usuario')
      }

      return res.status(201).json({ message: 'Usuario creado exitosamente' })
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
      }

      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }

  public async login (req: Request, res: Response): Promise<Response> {
    try {
      const { rut, password } = req.body
      const user = await this.userService.getUserByRut(rut)
      if (user === null) {
        throw new NotFoundError('usuario o password incorrectos')
      }
      const validPassword = comparePassword(password, user.password)
      if (!validPassword) {
        throw new NotFoundError('usuario o password incorrectos')
      }

      const token = generateToken(user)
      if (expiredPassword(user.nextPasswordChangeDate as Date)) {
        return res.cookie('token', token, { httpOnly: true }).status(403).json({
          message: 'Login exitoso',
          user: { name: user.name, surname: user.surname, role: user.role }
        })
      }

      await this.userService.updateLastConnection(user.userID)
      return res.cookie('token', token, { httpOnly: true }).status(200).json({
        message: 'Login exitoso',
        user: { name: user.name, surname: user.surname, role: user.role }
      })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async whoami (req: Request, res: Response): Promise<Response> {
    try {
      const userID = req.userID ?? ''
      const user = await this.userService.getUserById(userID)
      if (user === null) {
        res.clearCookie('token').json({ message: 'clear' })
        throw new NotFoundError('Usuario no encontrado')
      }
      return res.json({
        name: user.name,
        surname: user.surname,
        role: user.role
      })
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async logout (_req: Request, res: Response): Promise<Response> {
    try {
      res.clearCookie('token').json({ message: 'Logout exitoso' })
      return res.status(200)
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
