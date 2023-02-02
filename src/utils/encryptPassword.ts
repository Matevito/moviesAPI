import bcrypt from 'bcryptjs'

export const cryptPassword = (password: string): string => {
  const saltRounds = Number(process.env.SALT)
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(password, salt)
}
