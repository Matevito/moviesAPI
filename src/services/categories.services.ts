import { db } from '../database'
import { Category } from '../types'

// GET SERVICES
export const getCategories = async (): Promise<Category[] | undefined > => {
  const queryString: string = 'SELECT * FROM categories'
  try {
    const { rows } = await db.query(queryString, [])
    return rows
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getCategoryByTitle = async (title: string): Promise<Category> => {
  const queryString: string = 'SELECT * FROM categories WHERE title = $1'
  try {
    const { rows } = await db.query(queryString, [title])
    const result: Category = rows[0]
    return result
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}

// POST SERVICES
export const createCategory = async (title: string): Promise<void> => {
  const queryString: string = 'INSERT INTO categories (title) VALUES ($1)'
  try {
    await db.query(queryString, [title])
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}

// UPDATE SERVICES

// DELETE SERVICES
