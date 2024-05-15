import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { cognitoUtils } from '../utils/cognito.utils'

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization
  if (!token && !token?.startsWith('Bearer')) {
    throw new createHttpError.Unauthorized('Invalid token')
  }

  token = token.replace('Bearer ', '')

  try {
    const payload = await cognitoUtils.getVerifier().verify(token)

    req.cognitoId = payload.sub
    req.userId = payload['custom:id'] as string
    req.token = token
  } catch {
    throw new createHttpError.Unauthorized('Invalid credentials')
  }

  next()
}
