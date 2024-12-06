// src/mappers/users.mapper.ts
import { Role, Users } from '@prisma/client'
import { UsersDTO } from '../dto/users.dto'

export const toEntity = (userDto: UsersDTO): Users => {
  return {
    userID: userDto.userID as string,
    rut: userDto.rut,
    password: userDto.password,
    lastPassword: '',
    name: userDto.name,
    surname: userDto.surname,
    role: Role[userDto.role],
    createdAt: new Date(), // Asigna la fecha actual
    updatedAt: new Date(), // Asigna la fecha actual
    isActive: true, // Asigna un valor por defecto si es necesario
    lastConnection: null, // Asigna un valor por defecto si es necesario
    nextPasswordChangeDate: new Date() // Asigna la fecha actual o un valor por defecto
  }
}
