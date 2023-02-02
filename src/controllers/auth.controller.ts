import { Request, Response } from 'express'
import { createUser, getUserByEmail, getUserByUsername } from '../services/user.services'
import { secureUser } from '../utils/secureUser'
import { createToken } from '../utils/jwtAuthentication'

export const postSignup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body
  try {
    await createUser(username, email, password)
    const savedUser = await getUserByUsername(username)
    const userData = secureUser(savedUser)

    res.status(200).json({
      error: null,
      data: userData,
      msg: 'User created successfully!'
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
}

export const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body
    const savedUser = await getUserByEmail(email)
    const userData = secureUser(savedUser)
    const token = createToken(userData)

    res.status(200).json({
      error: null,
      msg: 'User successfully logged in',
      data: token
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
}
