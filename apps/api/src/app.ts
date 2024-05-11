import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { errorHandler } from './middleware/error-handler.middleware'

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use(errorHandler)

app.all('/*', (req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Cannot find specified route'
  })
})

export default app
