import express from 'express'
import cors from 'cors'
import { defaultRouter as v1Router } from './v1/routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', v1Router)

export default app
