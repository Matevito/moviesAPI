import { Request, Response } from 'express'

export const postCategory = (_req: Request, res: Response): void => {
  res.json({
    msg: 'create category'
  })
}

export const getCategories = (_req: Request, res: Response): void => {
  res.json({
    msg: 'get categories'
  })
}

export const getCategoryMovies = (_req: Request, res: Response): void => {
  res.json({
    msg: 'get movies of category :id'
  })
}
