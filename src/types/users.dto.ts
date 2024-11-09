import { Users } from '@prisma/client'

export type UsersCreateDTO = Pick<Users, 'rut' | 'password' | 'lastPassword' | 'name' | 'surname' | 'role' >
export type UsersWhoamiDTO = Pick<Users, 'name' | 'surname' | 'role'>
export type UsersGet = Pick<Users, 'userID' | 'rut' | 'name' | 'surname' | 'role'>
