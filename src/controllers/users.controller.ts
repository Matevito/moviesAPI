import { Request, Response } from 'express'
import { getUserByIdService, getUserMoviesWatched } from '../services/user.services'

export const getUsers = (_req: Request, res: Response): void => {
  res.json({
    msg: 'get users in db'
  })
}

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  const userId = req.params.id
  try {
    const userData = await getUserByIdService(Number(userId))
    if (userData === undefined) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      })
    }
    const userWatchedMovies = await getUserMoviesWatched(userId)
    res.status(200).json({
      error: null,
      data: {
        user: userData,
        userWatchedMovies
      },
      msg: 'User data found'
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
}
