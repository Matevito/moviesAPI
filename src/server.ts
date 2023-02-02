import * as dotenv from 'dotenv'
import app from './app'

dotenv.config()
const port: number = Number(process.env.PORT)

app.listen(port, () => {
  console.log(`API running in port: ${port}, url: http://localhost:${port}/.`)
})
