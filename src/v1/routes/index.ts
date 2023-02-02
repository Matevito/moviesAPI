import express, { RequestHandler } from 'express'
import { getUserById, getUsers } from '../../controllers/users.controller'
import { getMovieById, getMovies, getNoveltyMovies, postMovie, postMovieWatched } from '../../controllers/movies.controller'
import { getCategories, getCategoryMovies, postCategory } from '../../controllers/categories.controller'
import { postLogin, postSignup } from '../../controllers/auth.controller'
import { userLoginValidator, userSignupValidator } from '../../utils/validators/user.validator'

export const defaultRouter = express.Router()

// AUTHENTICATION ROUTES
defaultRouter
  .post('/auth/signup', userSignupValidator, (postSignup) as RequestHandler)
  .post('/auth/login', userLoginValidator, (postLogin) as RequestHandler)

// USERS routes
defaultRouter
  .get('/users', (getUsers) as RequestHandler)
  .get('/users/:id', (getUserById) as RequestHandler)

// MOVIES routes
defaultRouter
  .post('/movies', (postMovie) as RequestHandler)
  .post('/movies/:id/watched', (postMovieWatched) as RequestHandler)
  .get('/movies', (getMovies) as RequestHandler)
  .get('/movies/novelties', (getNoveltyMovies) as RequestHandler)
  .get('/movies/:id', (getMovieById) as RequestHandler)

// CATEGORIES routes
defaultRouter
  .post('/categories', (postCategory) as RequestHandler)
  .get('/categories', (getCategories) as RequestHandler)
  .get('/categories/:id/movies', (getCategoryMovies) as RequestHandler)
