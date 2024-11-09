import bcrypt from 'bcrypt'
import moment from 'moment'

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

export const expiredPassword = (expirationDatePassword: Date): boolean => {
  const currentDate = moment()
  return currentDate.isAfter(expirationDatePassword)
}

export const inTwoMonths = (): Date => {
  return moment().add(2, 'months').toDate()
}
