import { Request, Response } from 'express'
import { IGetUserInfoRequest } from '../types'
import { createMovie, getMovieByTitleService, getMoviesService, getNoveltyMoviesService, markMovieAsWatched } from '../services/movies.services'
import { getUserMoviesWatched } from '../services/user.services'
import { getCategoryByTitle } from '../services/categories.services'

export const postMovie = async (req: IGetUserInfoRequest, res: Response): Promise<void> => {
  const { title, description, releaseDate, category } = req.body
  try {
    await createMovie(title, description, releaseDate, category)
    const movieData = await getMovieByTitleService(title)
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

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  const title = req.query.title ?? undefined
  const categoryTitle = req.query.category ?? undefined
  const sort = req.query.sort ?? 'release_date'
  const page = req.query.page ?? 1
  const limit = req.query.limit ?? 10

  try {
    // Check if category name exist in db
    const categoryByTitle = await getCategoryByTitle(String(categoryTitle))
    let category
    if (categoryByTitle !== undefined) {
      category = categoryByTitle.id
    }
    // continue
    const moviesData = await getMoviesService({ title, category, sort, page, limit })
    res.status(200).json({
      error: null,
      data: moviesData,
      msg: 'Movies fetched successfully!'
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
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

export const getMovieByTitle = async (req: Request, res: Response): Promise<any> => {
  const { title } = req.params
  try {
    const savedMovie = await getMovieByTitleService(title)
    if (savedMovie === undefined) {
      // check if movie is stored in db
      return res.status(404).json({
        error: true,
        data: null,
        msg: 'Movie not found'
      })
    }

    res.status(200).json({
      error: null,
      data: savedMovie,
      msg: 'Movie fetched successfully!'
    })
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      data: null,
      msg: 'Internal server error!'
    })
  }
}
