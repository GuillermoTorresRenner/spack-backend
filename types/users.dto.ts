import { Users } from '@prisma/client'

export type UsersCreateDTO = Pick<Users, 'name' | 'surname' | 'rut' | 'password' | 'role' >
export type UsersWhoamiDTO = Pick<Users, 'name' | 'surname' | 'role' >
export type UsersEvenInactive = UsersWhoamiDTO & { isActive: boolean }
