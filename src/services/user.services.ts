import { db } from '../database'
import { createUserQuery, getUserByEmailQuery, getUserByIdQuery, getUserByUsernameQuery, getUserMoviesWatchedQuery, getUsersQuery } from '../database/sqlScipt'
import { UserFull, UserSecure } from '../types'
import { cryptPassword } from '../utils/encryptPassword'

// GET SERVICES

export const getUserByUsername = async (username: string): Promise<UserFull > => {
  const queryString = getUserByUsernameQuery
  try {
    const { rows } = await db.query(queryString, [username])
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getUserByEmail = async (email: string): Promise<UserFull> => {
  const queryString = getUserByEmailQuery
  try {
    const { rows } = await db.query(queryString, [email])
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getUserByIdService = async (id: number): Promise<UserFull> => {
  const queryString = getUserByIdQuery
  try {
    const { rows } = await db.query(queryString, [String(id)])
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}

export const getUsers = async (): Promise<UserSecure[]> => {
  const queryString: string = getUsersQuery
  try {
    const { rows } = await db.query(queryString, [])
    const result: UserSecure[] = rows.map((row: UserFull) => {
      return {
        id: row.id,
        username: row.username,
        email: row.email
      }
    })

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getUserMoviesWatched = async (userId: string): Promise<any> => {
  const queryString = getUserMoviesWatchedQuery
  try {
    const { rows } = await db.query(queryString, [userId])
    return rows
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}
// CREATE SERVICES

export const createUser = async (username: string, email: string, password: string): Promise<void> => {
  const queryString = createUserQuery
  const hash = cryptPassword(password)
  const userParams = [username, email, hash]
  try {
    await db.query(queryString, userParams)
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}
