import { Request, Response } from 'express'
import { getUserByIdService, getUserMoviesWatched, getUsersService } from '../services/user.services'
import { getMoviesWatched } from '../services/movies.services'

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    // build the data
    let usersData = await getUsersService()
    const watchedMovies = await getMoviesWatched()
    usersData = usersData.map((user: any) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        watchedMovies: []
      }
    })
    usersData = usersData.reduce((a: any, value: any) => ({ ...a, [value.id]: value }), {})
    watchedMovies.forEach((watchedData: any) => {
      if (usersData[watchedData.id] !== undefined) {
        usersData[watchedData.id].watchedMovies.push(watchedData.title)
      }
    })

    // reduce the data
    const reducedData: any = []
    watchedMovies.forEach((key: string) => {
      reducedData.push(usersData[key])
    })

    // send response
    res.status(200).json({
      error: false,
      data: usersData,
      msg: 'Retrieved Users successfully'
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
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
