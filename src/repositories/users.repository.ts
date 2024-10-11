import { PrismaClient, Users } from '@prisma/client'
import { UsersCreateDTO } from '../types/users.dto'

export class UsersRepository {
  private readonly prisma: PrismaClient
  constructor () {
    this.prisma = new PrismaClient()
  }

  async create (data: UsersCreateDTO): Promise<UsersCreateDTO> {
    return await this.prisma.users.create({ data })
  }

  async findByRut (rut: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { rut } })
  }

  async findById (userID: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { userID } })
  }

  async updateLastConnection (userID: string): Promise<Users> {
    return await this.prisma.users.update({ where: { userID }, data: { lastConnection: new Date() } })
  }

  async findUserRolebyId (userID: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { userID } })
  }

  async updateUser (userID: string, data: Users): Promise<Users> {
    return await this.prisma.users.update({ where: { userID }, data })
  }
}
