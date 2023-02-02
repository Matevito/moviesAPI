import { db } from '../database'
import { UserFull, UserSecure } from '../types'
import { cryptPassword } from '../utils/encryptPassword'

// GET SERVICES

export const getUserByUsername = async (username: string): Promise<UserFull | undefined> => {
  const queryString: string = 'SELECT * FROM users WHERE username = $1'
  try {
    const { rows } = await db.query(queryString, [username])
    if (rows.length === 0) return undefined
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getUserByEmail = async (email: string): Promise<UserFull | undefined> => {
  const queryString: string = 'SELECT * FROM users WHERE email = $1'
  try {
    const { rows } = await db.query(queryString, [email])
    if (rows.length === 0) return undefined
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getUserById = async (id: number): Promise<UserFull> => {
  const queryString: string = 'SELECT * FROM users WHERE id = $1'
  try {
    const { rows } = await db.query(queryString, [String(id)])
    if (rows.length === 0) return undefined
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getUsers = async (): Promise<UserSecure[]> => {
  const queryString: string = 'SELECT * FROM users'
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

// CREATE SERVICES

export const createUser = async (username: string, email: string, password: string): Promise<void> => {
  const queryString: string = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)'
  const hash = cryptPassword(password)
  const userParams = [username, email, hash]
  try {
    await db.query(queryString, userParams)
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}
