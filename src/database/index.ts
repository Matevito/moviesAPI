import * as dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const pool = new Pool({
  host: String(process.env.PSQL_HOST),
  user: String(process.env.PSQL_USER),
  password: String(process.env.PSQL_PASSWORD),
  port: Number(process.env.PSQL_PORT),
  database: String(process.env.PSQL_DB),
  connectionString: String(process.env.PSQL_UR)
})

export const db = {
  query: async (text: string, params: string[]) => await pool.query(text, params)
}
