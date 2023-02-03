import { db } from '../database'
import { MovieWithCategory } from '../types'

// GET movies servicess
export const getMovieByTitle = async (title: string): Promise<MovieWithCategory> => {
  const queryString: string = 'SELECT movies.*, categories.title as category_title FROM movies JOIN categories ON categories.id = movies.category WHERE movies.title = $1'
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
  let query = 'INSERT INTO movies (title, category, description, release_date)'
  const subquery = ' SELECT $1, id, $2, $3 FROM categories WHERE title = $4'
  query += subquery
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
