import { Request, Response } from 'express'
import { getUserByIdService, getUserMoviesWatched, getUsersService } from '../services/user.services'

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const usersData = await getUsersService()
    const reducedDataMap = usersData.reduce((data: any, item: any) => {
      const { id, username, email } = item
      if (data.has(id) === false) {
        data.set(id, { id, username, email, movies: [] })
      }
      data.get(id).movies.push({ title: item.title, id: item._id })
      return data
    }, new Map())

    const reducedData: any = []
    const dataMap = Object.fromEntries(reducedDataMap)
    const dataMapKeys = Object.keys(dataMap)
    dataMapKeys.forEach((key: string) => {
      reducedData.push(dataMap[key])
    })

    res.status(200).json({
      error: false,
      data: reducedData,
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
