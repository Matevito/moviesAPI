import { Request, Response } from 'express'

export const postMovie = (_req: Request, res: Response): void => {
  res.status(200).json({
    message: 'create movie'
  })
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
