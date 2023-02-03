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

export const getCategoryByName = async (name: string): Promise<Category> => {
  const queryString: string = 'SELECT * FROM categories WHERE name = $1'
  try {
    const { rows } = await db.query(queryString, [name])
    const result = rows[0]
    return result
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

// POST SERVICES
export const createCategory = async (title: string): Promise<void> => {
  const queryString: string = 'INSERT INTO categories (title) VALUES ($1)'
  try {
    await db.query(queryString, [title])
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

// UPDATE SERVICES

// DELETE SERVICES
