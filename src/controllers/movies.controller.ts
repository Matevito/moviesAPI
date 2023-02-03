import { Request, Response } from 'express'
import { IGetUserInfoRequest } from '../types'
import { createMovie, getMovieByTitle } from '../services/movies.services'

export const postMovie = async (req: IGetUserInfoRequest, res: Response): Promise<void> => {
  const { title, description, releaseDate, category } = req.body
  try {
    await createMovie(title, description, releaseDate, category)
    const movieData = await getMovieByTitle(title)
    res.status(200).json({
      error: null,
      data: movieData,
      msg: 'Movie created successfully!'
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
}

export const postMovieWatched = (_req: Request, res: Response): void => {
  res.status(200).json({
    message: 'mark movie as watched'
  })
}

export const getMovies = (_req: Request, res: Response): void => {
  res.status(200).json({
    message: 'get movies'
  })
}

export const getNoveltyMovies = (_req: Request, res: Response): void => {
  res.status(200).json({
    message: 'get novelty movies'
  })
}

export const getMovieById = (_req: Request, res: Response): void => {
  res.status(200).json({
    message: 'get movie by id'
  })
}
