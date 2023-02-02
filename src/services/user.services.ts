import { db } from '../database'
import { UserFull } from '../types'

// GET SERVICES

export const getUserByUsername = async (username: string): Promise< UserFull > => {
  const queryString: string = 'SELECT * FROM users WHERE username = $1'
  try {
    const { rows } = await db.query(queryString, [username])
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getUserByEmail = async (email: string): Promise< UserFull > => {
  const queryString: string = 'SELECT * FROM users WHERE email = $1'
  try {
    const { rows } = await db.query(queryString, [email])
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

// CREATE SERVICES

export const createUser = async (username: string, email: string, password: string): Promise< UserFull > => {
  const userParams = [username, email, password]
  const queryString: string = 'INSERT INTO users (username, email, password) VALUES ($1 $2 $3)'
  try {
    const { rows } = await db.query(queryString, userParams)
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}
