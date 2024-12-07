import { Request, Response } from 'express'
import { UserService } from '../services/users.service'
import { UsersCreateDTO } from '../types/users.dto'
import { InternalServerError, NotFoundError, CustomError, RepeatedPasswordError } from '../errors/customError'
import { comparePassword, hashPassword, inTwoMonths } from '../utils/passwords'

export class UsersController {
  private readonly userService = new UserService()

  /**
   * @swagger
   * /users/{userIdToUpdate}:
   *   put:
   *     summary: Actualiza los datos de un usuario
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userIdToUpdate
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario a actualizar
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UsersDTO'
   *     responses:
   *       200:
   *         description: Usuario actualizado con éxito
   *       404:
   *         description: Usuario no encontrado
   *       500:
   *         description: Error interno del servidor
   */
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

  /**
   * @swagger
   * /users/update-password:
   *   put:
   *     summary: Actualiza la contraseña de un usuario
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               currentPassword:
   *                 type: string
   *               newPassword:
   *                 type: string
   *     responses:
   *       200:
   *         description: Contraseña actualizada con éxito
   *       404:
   *         description: Usuario no encontrado o contraseña actual incorrecta
   *       500:
   *         description: Error interno del servidor
   */
  public async updatePassword (req: Request, res: Response): Promise<Response> {
    try {
      const { currentPassword, newPassword } = req.body
      const userID = req.userID ?? ''
      const foundedUser = await this.userService.getUserById(userID) as UsersCreateDTO
      if (foundedUser == null) throw new NotFoundError('Usuario no encontrado')
      const validPassword = comparePassword(currentPassword, foundedUser.password)
      if (!validPassword) throw new NotFoundError('Contraseña actual incorrecta')
      const repeatedPassword = comparePassword(newPassword, foundedUser.password)
      if (repeatedPassword) throw new RepeatedPasswordError('La contraseña nueva no puede ser igual a la anterior')
      const hashedNewPassword = hashPassword(newPassword)
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

  /**
   * @swagger
   * /users/{userIDToDelete}:
   *   delete:
   *     summary: Elimina un usuario
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userIDToDelete
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario a eliminar
   *     responses:
   *       200:
   *         description: Usuario eliminado con éxito
   *       404:
   *         description: Usuario no encontrado
   *       500:
   *         description: Error interno del servidor
   */
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

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Obtiene todos los usuarios activos
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de usuarios activos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/UsersGet'
   *       500:
   *         description: Error interno del servidor
   */
  public async getAllActiveUsers (_req: Request, res: Response): Promise<Response> {
    try {
      const activeUsers = await this.userService.getAllActiveUsers()
      return res.json(activeUsers)
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Obtiene un usuario por ID
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario a obtener
   *     responses:
   *       200:
   *         description: Datos del usuario
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UsersGet'
   *       404:
   *         description: Usuario no encontrado
   *       500:
   *         description: Error interno del servidor
   */
  public async getUserById (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const user = await this.userService.getUserById(id)
      if (user == null) throw new NotFoundError('Usuario no encontrado')
      return res.json({ userId: user.userID, name: user.name, surname: user.surname, role: user.role, isActive: user.isActive })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }
}
