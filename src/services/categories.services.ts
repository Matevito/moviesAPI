import { db } from '../database'
import { createCategoryQuery, getCategoriesQuery, getCategoryByTitleQuery } from '../database/sqlScipt'
import { Category } from '../types'

// GET SERVICES
export const getCategoriesService = async (): Promise<Category[] | undefined > => {
  const queryString = getCategoriesQuery
  try {
    const { rows } = await db.query(queryString, [])
    return rows
  } catch (err: any) {
    throw new Error('Error connecting to db')
  }
}

export const getCategoryByTitle = async (title: string): Promise<Category> => {
  const queryString = getCategoryByTitleQuery
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
  const queryString = createCategoryQuery
  try {
    await db.query(queryString, [title])
  } catch (err: any) {
    console.log(err.message)
    throw new Error('Error connecting to db')
  }
}

// UPDATE SERVICES

// DELETE SERVICES
