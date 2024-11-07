import { UsersRepository } from '../repositories/users.repository'
import { UsersCreateDTO, UsersWhoamiDTO } from '../../types/users.dto'
import { hashPassword } from '../utils/passwords'
import { Role, Users } from '@prisma/client'

export class UserService {
  private readonly usersRepository = new UsersRepository()

  async createUser (user: UsersCreateDTO): Promise<UsersCreateDTO> {
    user.password = hashPassword(user.password)
    return await this.usersRepository.create(user)
  }

  async getUserByRut (rut: string): Promise<Users | null> {
    return await this.usersRepository.findByRut(rut)
  }

  async getUserById (userID: string): Promise<UsersWhoamiDTO> {
    const user = await this.usersRepository.findById(userID)
    const userDTO: UsersWhoamiDTO = {
      name: user?.name as string,
      surname: user?.surname as string,
      role: user?.role as Role
    }
    return userDTO
  }

  async updateLastConnection (userID: string): Promise<Users> {
    return await this.usersRepository.updateLastConnection(userID)
  }

  async getRoleByID (userID: string): Promise<Users | null> {
    return await this.usersRepository.findUserRolebyId(userID)
  }

  async updateUser (userID: string, data: Users): Promise<Users> {
    return await this.usersRepository.updateUser(userID, data)
  }
}
