import express from 'express'
import { getUserById, getUsers, postUser } from '../../controllers/users.controller'
import { getMovieById, getMovies, getNoveltyMovies, postMovie, postMovieWatched } from '../../controllers/movies.controller'
import { getCategories, getCategoryMovies, postCategory } from '../../controllers/categories.controller'

export const defaultRouter = express.Router()

// USERS routes
defaultRouter
  .post('/users', postUser)
  .get('/users', getUsers)
  .get('/users/:id', getUserById)

// MOVIES routes
defaultRouter
  .post('/movies', postMovie)
  .post('/movies/:id/watched', postMovieWatched)
  .get('/movies', getMovies)
  .get('/movies/novelties', getNoveltyMovies)
  .get('/movies/:id', getMovieById)

// CATEGORIES routes
defaultRouter
  .post('/categories', postCategory)
  .get('/categories', getCategories)
  .get('/categories/:id/movies', getCategoryMovies)
