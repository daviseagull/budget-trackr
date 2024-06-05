import rTracer from 'cls-rtracer'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import { errorHandler } from './middlewares/error-handler.middleware'
import routes from './routes'

const app = express()

app.use(cors())
app.use(helmet())

app.use(rTracer.expressMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.all('/*', (_req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Cannot find specified route',
  })
})

app.use(errorHandler)

export default app
