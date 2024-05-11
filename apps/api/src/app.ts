import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import logger from './config/logger'

const app = express()
const port = 3000

app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  logger.info('Teste')
  res.send('Hello World!')
})

app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`)
})

// Export Express app
export default app
