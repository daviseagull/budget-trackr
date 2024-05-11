import winston from 'winston'
import { env } from './env'

const { combine, timestamp, json, errors } = winston.format

const logger = winston.createLogger({
  level: env.LOG_LEVEL || 'info',
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [new winston.transports.Console()]
})

export default logger
