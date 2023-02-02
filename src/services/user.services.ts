import { db } from '../database'
import { UserFull } from '../types'

export const getUserByUsername = async (username: string): Promise< UserFull | undefined > => {
  const queryString: string = 'SELECT * FROM users WHERE username = $1'
  try {
    const { rows } = await db.query(queryString, [username])
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getUserByEmail = async (email: string): Promise<UserFull | undefined > => {
  const queryString: string = 'SELECT * FROM users WHERE email = $1'
  try {
    const { rows } = await db.query(queryString, [email])
    const result: UserFull = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}
