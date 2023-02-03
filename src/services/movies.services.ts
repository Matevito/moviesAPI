import { db } from '../database'
import { createMovieQuery, getMovieByTitleQuery } from '../database/sqlScipt'
import { MovieWithCategory } from '../types'

// GET movies services
export const getMovieByTitle = async (title: string): Promise<MovieWithCategory> => {
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

// CREATE movies services
export const createMovie = async (title: string, description: string, releaseDate: string, category: string): Promise<void> => {
  const query = createMovieQuery
  try {
    await db.query(query, [title, description, releaseDate, category])
  } catch (err: any) {
    console.log(query)
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}

// UPDATE movies services

// DELETE movies services
