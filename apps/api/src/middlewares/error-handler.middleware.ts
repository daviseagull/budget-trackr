import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import { ZodError } from 'zod'
import { httpUtils } from '../utils/http.utils'

export const errorHandler = (
  err: Error & HttpError & ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error) {
    res.status(500).json(httpUtils.createResponse(false, err.message, 500))
  }

  if (err instanceof HttpError) {
    res
      .status(err.statusCode)
      .send(httpUtils.createResponse(false, err.message, err.statusCode))
    next()
  }

  next()
}
