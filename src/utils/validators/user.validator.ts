import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { getUserByEmail, getUserByUsername } from '../../services/user.services'

export const userSignupValidator = [
  body('username').isString().isLength({ min: 5, max: 255 }).trim().escape(),
  body('username').custom(async (value: string): Promise<undefined | boolean> => {
    const searchUsername = await getUserByUsername(value)
    if (searchUsername !== undefined) throw new Error('Username already exists')
    return true
  }).escape(),

  body('email').isEmail().normalizeEmail().trim().escape(),
  body('email').custom(async (value: string): Promise<undefined | boolean> => {
    const searchEmail = await getUserByEmail(value)
    if (searchEmail !== undefined) throw new Error('Email already exists')
    return true
  }),

  body('password').isString().isLength({ min: 5 }).trim().escape(),
  body('password_confirmation').custom((value: string, { req }): undefined | boolean => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match')
    }
    return true
  }),

  (req: Request, res: Response, next: NextFunction): any => {
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

export const userLoginValidator = [
  body('email').isEmail().normalizeEmail().trim().escape(),
  body('password').isString().isLength({ min: 5 }).trim().escape(),
  body('password').custom(() => console.log('todo')).escape(),

  (req: Request, res: Response, next: NextFunction): any => {
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
