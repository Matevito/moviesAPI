import { Request } from 'express'

// express types
interface CallbackError {
  message: string
}
export interface IGetUserInfoRequest extends Request {
  user?: any
}

// user types
export interface UserResult {
  rows: UserFull[]
}

export interface UserFull {
  id: integer
  username: string
  email: string
  password: string
}

export type UserSecure = Omit<UserFull, 'password'>

// category types
export interface Category {
  id: integer
  title: string
}

// movie types
export interface Movie {
  id: integer
  title: string
  description: string
  release_date: Date
  category: integer
}

export interface MovieWithCategory extends Movie {
  category: Category
}
export type MovieDetails = Omit<Movie, 'id'>
