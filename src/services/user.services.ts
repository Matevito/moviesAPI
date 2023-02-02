import { db } from '../database'
// import { CallbackError, UserFull, UserResult, UserSecure } from '../types'

export const getUserByUsername = async (username: string): Promise<any> => {
  const queryString: string = 'SELECT * FROM users WHERE username = $1'
  try {
    const { rows } = await db.query(queryString, [username])
    const result = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getUserByEmail = async (email: string): Promise<any> => {
  const queryString: string = 'SELECT * FROM users WHERE email = $1'
  try {
    const { rows } = await db.query(queryString, [email])
    const result = rows[0]

    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}
