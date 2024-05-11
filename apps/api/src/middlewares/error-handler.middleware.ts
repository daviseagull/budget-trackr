import { NextFunction, Request, Response } from 'express'
import logger from '../config/logger'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.name || err.stack
    ? logger.error(`${err.message} - (${err.name}) ${err.stack}`)
    : logger.error(err.message)

  res.json({
    message: err.message
  })

  next()
}
