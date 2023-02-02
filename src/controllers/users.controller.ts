import { Request, Response } from 'express'

export const postUser = (_req: Request, res: Response): void => {
  res.json({
    msg: 'todo create user route'
  })
}

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
