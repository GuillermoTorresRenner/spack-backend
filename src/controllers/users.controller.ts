import { Request, Response } from 'express'
import { UserService } from '../services/users.service'
import { UsersCreateDTO } from '../types/users.dto'
import { InternalServerError, NotFoundError, CustomError } from '../errors/customError'
import { comparePassword, hashPassword, inTwoMonths } from '../utils/passwords'
export class UsersController {
  private readonly userService = new UserService()

  public async updateUserData (req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      const { userIdToUpdate } = req.params
      const foundedUser = await this.userService.getUserById(userIdToUpdate)
      if (foundedUser == null) throw new NotFoundError('User no encontrado')

      const updatedUser = await this.userService.updateUser(userIdToUpdate, data)
      if (updatedUser === null) throw new InternalServerError('Error al actualizar el usuario')
      return res.json({ message: 'Usuario actualizado con éxito' })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }

  public async updatePassword (req: Request, res: Response): Promise<Response> {
    try {
      const { currentPassword, newPassword } = req.body
      const userID = req.userID ?? ''
      const foundedUser = await this.userService.getUserById(userID) as UsersCreateDTO
      if (foundedUser == null) throw new NotFoundError('Usuario no encontrado')
      const validPassword = comparePassword(currentPassword, foundedUser.password)
      if (!validPassword) throw new NotFoundError('Contraseña actual incorrecta')
      const hashedNewPassword = hashPassword(newPassword)
      console.log(hashedNewPassword)
      const updatedPassword = await this.userService.updatePassword(userID, hashedNewPassword, inTwoMonths())
      if (updatedPassword == null) throw new InternalServerError('Error al Actualizar contraseña')
      return res.json({ message: 'Contraseña actualizada con éxito' })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }

  public async deleteUser (req: Request, res: Response): Promise<Response> {
    try {
      const { userIDToDelete } = req.params
      const foundedUser = await this.userService.getUserById(userIDToDelete)
      if (foundedUser == null) throw new NotFoundError('Usuario no encontrado')
      const deletedUser = await this.userService.deleteUser(userIDToDelete)
      if (deletedUser == null) throw new InternalServerError('Error al eliminar el usuario')
      return res.json({ message: 'Usuario eliminado con éxito' })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }

  public async getAllActiveUsers (_req: Request, res: Response): Promise<Response> {
    try {
      const activeUsers = await this.userService.getAllActiveUsers()
      return res.json(activeUsers)
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }

  public async getUserById (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const user = await this.userService.getUserById(id)
      if (user == null) throw new NotFoundError('Usuario no encontrado')
      return res.json(user)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }
}
