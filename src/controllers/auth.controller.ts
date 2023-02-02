import { Request, Response } from 'express'

export const postSignup = (_req: Request, res: Response): void => {
  res.json({
    msg: 'todo create user route'
  })
}

export const postLogin = (_req: Request, res: Response): void => {
  res.json({
    msg: 'login route'
  })
}
