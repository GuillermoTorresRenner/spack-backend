import { Users } from '@prisma/client'

export type UsersCreateDTO = Pick<Users, 'rut' | 'password' | 'name' | 'surname' >
export type UsersWhoamiDTO = Pick<Users, 'name' | 'surname'>
