import { Request, Response } from 'express'
import { IGetUserInfoRequest } from '../types'
import { createMovie, getMovieByTitle, getNoveltyMoviesService, markMovieAsWatched } from '../services/movies.services'
import { getUserMoviesWatched } from '../services/user.services'

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

export const postMovieWatched = async (req: IGetUserInfoRequest, res: Response): Promise<any> => {
  // this route could be dinamic and change the movie as
  // watched if is not, and to not watched if it is

  const userId = req.user?.id
  const { movieId } = req.params
  try {
    // check if movie is already marked as watched
    const userMoviesData = await getUserMoviesWatched(userId)
    const moviesWatchedIds = userMoviesData.map((movies: any) => movies.id)
    if (moviesWatchedIds.includes(Number(movieId)) === true) {
      return res.status(401).json({
        error: true,
        msg: 'Movie already marked as watched'
      })
    }
    // is valid, continue
    await markMovieAsWatched(userId, movieId)
    res.status(200).json({
      error: null,
      msg: 'marked movie as watched'
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
}

export const getMovies = (_req: Request, res: Response): void => {
  res.status(200).json({
    message: 'get movies'
  })
}

export const getNoveltyMovies = async (_req: Request, res: Response): Promise<void> => {
  try {
    const noveltyMovies = await getNoveltyMoviesService()

    res.status(200).json({
      error: null,
      data: noveltyMovies,
      msg: 'returned movies from the last 3 weeks'
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
}

export const getMovieById = (_req: Request, res: Response): void => {
  res.status(200).json({
    message: 'get movie by id'
  })
}
