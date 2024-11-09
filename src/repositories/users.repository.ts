import { PrismaClient, Users } from '@prisma/client'
import { UsersCreateDTO, UsersGet } from '../types/users.dto'

export class UsersRepository {
  private readonly prisma: PrismaClient
  constructor () {
    this.prisma = new PrismaClient()
  }

  async create (data: UsersCreateDTO): Promise<UsersCreateDTO> {
    return await this.prisma.users.create({ data })
  }

  async findByRut (rut: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { rut, isActive: true } })
  }

  async findById (userID: string): Promise<Users | null> {
    return await this.prisma.users.findFirst({
      where: { userID, isActive: true }
    })
  }

  async findByIdEvenInactive (userID: string): Promise<Users | null> {
    return await this.prisma.users.findFirst({
      where: { userID }
    })
  }

  async findByRutEvenInactive (rut: string): Promise<Users | null> {
    return await this.prisma.users.findFirst({
      where: { rut }
    })
  }

  async updateLastConnection (userID: string): Promise<Users> {
    return await this.prisma.users.update({
      where: { userID },
      data: { lastConnection: new Date() }
    })
  }

  async findUserRolebyId (userID: string): Promise<{ role: string } | null> {
    return await this.prisma.users.findUnique({
      where: { userID },
      select: {
        role: true
      }
    })
  }

  async updateUser (userID: string, data: Users): Promise<Users> {
    return await this.prisma.users.update({ where: { userID }, data })
  }

  async updatePassword (
    userID: string,
    newPassword: string,
    newExpirationDate: Date
  ): Promise<Users> {
    return await this.prisma.users.update({
      where: { userID },
      data: {
        password: newPassword,
        lastPassword: newPassword,
        nextPasswordChangeDate: newExpirationDate
      }
    })
  }

  async deleteUser (userID: string): Promise<Users> {
    return await this.prisma.users.update({
      where: { userID },
      data: { isActive: false }
    })
  }

  async getAllActiveUsers (): Promise<UsersGet[] | null> {
    return await this.prisma.users.findMany({
      where: { isActive: true },
      select: {
        userID: true,
        rut: true,
        name: true,
        surname: true,
        role: true
      }
    })
  }

  async getAllInactiveUsers (): Promise<Users[]> {
    return await this.prisma.users.findMany({
      where: { isActive: false }
    })
  }
}
