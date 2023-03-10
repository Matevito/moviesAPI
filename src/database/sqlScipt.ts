import { MovieQueries } from '../types'

// user queries

// these 3 queries could be a function where the table name is passed in as an argument!
export const getUserByUsernameQuery = `
    SELECT * 
    FROM users 
    WHERE username = $1;
`
export const getUserByEmailQuery = `
    SELECT * 
    FROM users 
    WHERE email = $1;
`
export const getUserByIdQuery = `
    SELECT id, username 
    FROM users 
    WHERE id = $1;
`

export const getUsersQuery = `
    SELECT id, username, email 
    FROM users;
`
export const createUserQuery = `
    INSERT INTO users (username, email, password) 
    VALUES ($1, $2, $3);
`

// categories queries
export const getCategoryByTitleQuery = `
    SELECT * 
    FROM categories WHERE title = $1;
`

export const getCategoriesQuery = `
    SELECT * 
    FROM categories;
`

export const createCategoryQuery = `
    INSERT INTO categories (title) 
    VALUES ($1);
`

// movies queries
// create a movie without the need of the category id
export const getMovieByTitleQuery = `
    SELECT movies.*, categories.title as category_title 
    FROM movies 
    JOIN categories ON categories.id = movies.category 
    WHERE movies.title = $1;
`
export const createMovieQuery = `
    INSERT INTO movies (title, category, description, release_date) 
    SELECT $1, id, $2, $3 FROM categories 
    WHERE title = $4;
`
export const getNoveltyMoviesQuery = `
    SELECT movies.*, categories.title as category_title
    FROM movies
    JOIN categories ON categories.id = movies.category
    WHERE release_date BETWEEN (NOW() - interval '21 days') AND NOW();
`

// users_movies table
export const markMovieAsWatchedQuery = `
    INSERT INTO user_movies (user_id, movie_id) VALUES ($1, $2);
`
export const getUserMoviesWatchedQuery = `
    SELECT movies.id, movies.title
    FROM movies
    JOIN user_movies ON user_movies.movie_id = movies.id
    WHERE user_movies.user_id = $1;
`
// this query is wrong because does not retrieve users that have not watched movies
export const getAllUsersMoviesWatchedQuery = `
    SELECT users.id, users.username, users.email, movies.title
    FROM users
    JOIN user_movies ON users.id = user_movies.user_id
    JOIN movies ON user_movies.movie_id = movies.id;
`

// !dinamic queries builder
export const getMoviesQuery = (params: MovieQueries): any => {
  const { title, category, page, limit, sort } = params
  let sql = 'SELECT * FROM movies'
  const Sqlparams: any = []

  if (title !== undefined) {
    sql += ` WHERE title LIKE '%${String(title)}%'`
    Sqlparams.push(title)
  }

  if (category !== undefined) {
    if (Sqlparams.length === 0) {
      sql += ' WHERE'
    }
    if (Sqlparams.length > 0) {
      sql += ' AND'
    }
    sql += ` category = ${String(category)}`
    Sqlparams.push(category)
  }

  if (sort !== undefined) {
    sql += ` ORDER BY ${String(sort)} DESC`
    Sqlparams.push(sort)
  }

  sql += ` LIMIT ${String(limit)} OFFSET ${(page - 1) * limit}`
  console.log(sql)
  return {
    sql,
    params: Sqlparams
  }
}
