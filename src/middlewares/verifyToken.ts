import * as dotenv from 'dotenv'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IGetUserInfoRequest } from '../types'

dotenv.config()

export const verifyToken = (req: IGetUserInfoRequest, res: Response, next: NextFunction): void => {
  const token = String(req.header('auth-token'))
  const secret = String(process.env.TOKEN_SECRET)
  if (token === undefined) {
    res.status(401).json({
      error: true,
      msg: 'Route protected, access denied'
    })
  }

  try {
    const userData = jwt.verify(token, secret)
    req.user = userData
    // req.user = { id, email, username }
    next()
  } catch (err) {
    res.status(401).json({
      error: true,
      msg: 'Invalid credentials'
    })
  }
}
