import { db } from '../database'
import { createMovieQuery, getAllUsersMoviesWatchedQuery, getMovieByTitleQuery, getMoviesQuery, getNoveltyMoviesQuery, markMovieAsWatchedQuery } from '../database/sqlScipt'
import { MovieQueries, MovieWithCategory } from '../types'

// GET movies services
export const getMovieByTitleService = async (title: string): Promise<MovieWithCategory> => {
  const queryString = getMovieByTitleQuery
  try {
    const { rows } = await db.query(queryString, [title])
    const result: MovieWithCategory = rows[0]
    return result
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}

/* export const getMovies */
export const getMoviesService = async (params: MovieQueries): Promise<any> => {
  const sqlData = getMoviesQuery(params)
  try {
    const { rows } = await db.query(sqlData.sql, [])
    return rows
  } catch (err: any) {
    console.log(sqlData)
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}

export const getNoveltyMoviesService = async (): Promise<any> => {
  const queryString = getNoveltyMoviesQuery
  try {
    const { rows } = await db.query(queryString, [])
    return rows
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}

export const getMoviesWatched = async (): Promise<any> => {
  const queryString = getAllUsersMoviesWatchedQuery
  try {
    const { rows } = await db.query(queryString, [])
    return rows
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}
// CREATE movies services
export const createMovie = async (title: string, description: string, releaseDate: string, category: string): Promise<void> => {
  const query = createMovieQuery
  try {
    await db.query(query, [title, description, releaseDate, category])
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}

// UPDATE movies services
// i will put the following service here cause i don't fin a better place to
export const markMovieAsWatched = async (userId: string, movieId: string): Promise<void> => {
  const query = markMovieAsWatchedQuery
  try {
    await db.query(query, [userId, movieId])
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}

// DELETE movies services
