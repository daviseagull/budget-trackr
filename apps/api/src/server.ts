import app from './app'
import { env } from './config/env'
import logger from './config/logger'

const port = env.PORT ?? 3333

app.listen(port, () => logger.info(`Server is running in port ${port}`))
