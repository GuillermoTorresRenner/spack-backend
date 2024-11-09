import { UsersEvenInactive } from '../../types/users.dto'
import { UsersRepository } from '../repositories/users.repository'
import { UsersCreateDTO, UsersGet, UsersWhoamiDTO } from '../types/users.dto'
import { hashPassword } from '../utils/passwords'
import { Role, Users } from '@prisma/client'

export class UserService {
  private readonly usersRepository = new UsersRepository()

  async createUser (user: UsersCreateDTO): Promise<UsersCreateDTO> {
    user.password = hashPassword(user.password)
    user.lastPassword = user.password
    return await this.usersRepository.create(user)
  }

  async getUserByRut (rut: string): Promise<Users | null> {
    return await this.usersRepository.findByRut(rut)
  }

  async getUserById (userID: string): Promise<Users | null> {
    const user = await this.usersRepository.findById(userID)

    return user
  }

  async getUserByIdEvenInactive (id: string): Promise<UsersWhoamiDTO> {
    const user = await this.usersRepository.findByIdEvenInactive(id)
    const userDTO: UsersWhoamiDTO = {
      name: user?.name as string,
      surname: user?.surname as string,
      role: user?.role as Role
    }
    return userDTO
  }

  async getUserByRutEvenInactive (rut: string): Promise<UsersEvenInactive> {
    const user = await this.usersRepository.findByRutEvenInactive(rut)
    const userDTO: UsersEvenInactive = {
      name: user?.name as string,
      surname: user?.surname as string,
      role: user?.role as Role,
      isActive: user?.isActive as boolean
    }
    return userDTO
  }

  async updateLastConnection (userID: string): Promise<Users> {
    return await this.usersRepository.updateLastConnection(userID)
  }

  async getRoleByID (userID: string): Promise<{ role: String } | null > {
    return await this.usersRepository.findUserRolebyId(userID)
  }

  async updateUser (userID: string, data: Partial<Users>): Promise<Users> {
    const updatedData: Partial<Users> = {}

    if (data.rut !== undefined || data.rut !== '') {
      updatedData.rut = data.rut
    }
    if (data.password !== undefined && data.password !== '') {
      updatedData.password = hashPassword(data.password)
    }
    if (data.name !== undefined || data.name !== '') {
      updatedData.name = data.name
    }
    if (data.surname !== undefined || data.surname !== '') {
      updatedData.surname = data.surname
    }

    updatedData.role = data.role

    return await this.usersRepository.updateUser(userID, updatedData as Users)
  }

  async updatePassword (userID: string, newPassword: string, newExpirationDate: Date): Promise<Users> {
    return await this.usersRepository.updatePassword(userID, newPassword, newExpirationDate)
  }

  async deleteUser (userID: string): Promise<Users> {
    return await this.usersRepository.deleteUser(userID)
  }

  async getAllActiveUsers (): Promise<UsersGet[] | null> {
    return await this.usersRepository.getAllActiveUsers()
  }

  async getAllInactiveUsers (): Promise<Users[]> {
    return await this.usersRepository.getAllInactiveUsers()
  }
}
