import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

interface CallbackError {
  message: string
}

export interface UserResult {
  rows: UserFull[]
}

export interface UserFull {
  id: integer
  username: string
  email: string
  password: string
}

export type UserSecure = Omit<UserFull, 'password'>

export interface IGetUserInfoRequest extends Request {
  user?: string | JwtPayload
}
