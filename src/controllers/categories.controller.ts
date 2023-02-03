import { Request, Response } from 'express'
import { IGetUserInfoRequest } from '../types'
import { createCategory, getCategoryByName } from '../services/categories.services'

export const postCategory = async (req: IGetUserInfoRequest, res: Response): Promise<void> => {
  const { category } = req.body
  try {
    await createCategory(category)
    const categoryData = await getCategoryByName(category)
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
