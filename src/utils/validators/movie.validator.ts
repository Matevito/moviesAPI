import { NextFunction, Response } from 'express'
import { IGetUserInfoRequest } from '../../types'
import { body, validationResult } from 'express-validator'
import { getCategoryByName } from '../../services/categories.services'

export const movieCreateValidator = [
  body('title')
    .isString()
    .isLength({ min: 1, max: 255 }).trim().escape(),

  body('description')
    .isString()
    .isLength({ min: 5, max: 1050 }).trim().escape(),

  body('releaseDate')
    .isDate()
    .trim()
    .escape(),

  body('category')
    .custom(async (value: string): Promise<boolean | undefined> => {
      const categoryInDb = await getCategoryByName(value)
      if (categoryInDb === undefined) throw new Error('Category not found, try with another one')
      return true
    }).escape(),

  (req: IGetUserInfoRequest, res: Response, next: NextFunction): any => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        msg: 'Error validating data'
      })
    }

    next()
  }
]
