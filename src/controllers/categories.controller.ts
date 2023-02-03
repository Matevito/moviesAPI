import { Request, Response } from 'express'
import { IGetUserInfoRequest } from '../types'
import { createCategory, getCategoriesService, getCategoryByTitle } from '../services/categories.services'

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

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categoriesSaved = await getCategoriesService()
    res.status(200).json({
      error: null,
      data: categoriesSaved,
      msg: 'Categories fetched successfully!'
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
}
