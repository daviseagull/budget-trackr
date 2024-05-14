import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import { httpUtils } from '../utils/http.utils'

export const errorHandler = (
  err: Error & HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json(httpUtils.createResponse(false, err.message, err.statusCode))
  next()
}
