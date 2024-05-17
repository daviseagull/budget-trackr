import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import logger from '../config/logger'
import { httpUtils } from '../utils/http.utils'

export const errorHandler = (
  err: Error & HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`(${err.name}) ${err.message} `)
  if (err instanceof HttpError) {
    res
      .status(err.statusCode)
      .json(httpUtils.createResponse(false, err.message, err.statusCode))
  } else if (err instanceof Error) {
    res.status(500).json(httpUtils.createResponse(false, err.message, 500))
  }

  next()
}
