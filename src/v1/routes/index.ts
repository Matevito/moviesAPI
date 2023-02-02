import express from 'express'
import { getUserById, getUsers } from '../../controllers/users.controller'
import { getMovieById, getMovies, getNoveltyMovies, postMovie, postMovieWatched } from '../../controllers/movies.controller'
import { getCategories, getCategoryMovies, postCategory } from '../../controllers/categories.controller'
import { postLogin, postSignup } from '../../controllers/auth.controller'
import { userSignupValidator } from '../../utils/validators/user.validator'

export const defaultRouter = express.Router()

// AUTHENTICATION ROUTES
defaultRouter
  .post('/auth/signup', userSignupValidator, postSignup)
  .post('/auth/login', postLogin)

// USERS routes
defaultRouter
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
