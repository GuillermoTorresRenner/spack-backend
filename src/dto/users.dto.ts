
// src/interfaces/users.dto.ts

import { Role } from '@prisma/client'

export interface UsersDTO {
  userID?: string
  rut: string
  password: string
  lastPassword: string
  name: string
  surname: string
  role: Role
}

export interface UsersWhoamiDTO {
  name: string
  surname: string
  role: Role
}
