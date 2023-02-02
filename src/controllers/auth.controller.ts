import { Request, Response } from 'express'
import { createUser, getUserByUsername } from '../services/user.services'
import { secureUser } from '../utils/secureUser'

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

export const postLogin = (_req: Request, res: Response): void => {
  res.json({
    msg: 'login route'
  })
}
