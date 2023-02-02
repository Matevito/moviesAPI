import { Request, Response } from 'express'

export const getUsers = (_req: Request, res: Response): void => {
  res.json({
    msg: 'get users in db'
  })
}

export const getUserById = (_req: Request, res: Response): void => {
  res.json({
    msg: 'get user by id'
  })
}
