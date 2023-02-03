import { NextFunction, Response } from 'express'
import { IGetUserInfoRequest } from '../../types'
import { body, validationResult } from 'express-validator'
import { getCategoryByTitle } from '../../services/categories.services'

export const categoryCreateValidator = [
  body('title')
    .isString()
    .isLength({ min: 3 }).trim().escape(),

  body('title')
    .custom(async (value: string): Promise<boolean | undefined> => {
      const categoryInDb = await getCategoryByTitle(value)
      if (categoryInDb !== undefined) throw new Error('Category already exists')
      return true
    }).escape(),

  (req: IGetUserInfoRequest, res: Response, next: NextFunction): any => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()[0]
      })
    }
    next()
  }
]
