import { Request, Response } from 'express'
import { IGetUserInfoRequest } from '../types'
import { createCategory, getCategoryByTitle } from '../services/categories.services'

export const postCategory = async (req: IGetUserInfoRequest, res: Response): Promise<void> => {
  const { title } = req.body
  try {
    await createCategory(title)
    const categoryData = await getCategoryByTitle(title)
    res.status(200).json({
      error: null,
      data: categoryData,
      msg: 'Category created successfully!'
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
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
