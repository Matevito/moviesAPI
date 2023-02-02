import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { UserSecure } from '../types'
dotenv.config()

export const createToken = (userData: UserSecure): string => {
  const secret = String(process.env.TOKEN_SECRET)
  const opts = { expiresIn: process.env.SECRET_EXPIRY }

  const token = jwt.sign(userData, secret, opts)
  return token
}
