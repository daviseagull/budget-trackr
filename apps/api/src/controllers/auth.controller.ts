import {
  SignInRequest,
  SignInRequestSchema,
  SignInResponse
} from '@budget-trackr/dtos'
import { Request, Response } from 'express'
import { authUseCases } from '../use-cases/auth.use-cases'
import { httpUtils } from '../utils/http.utils'

export const authController = {
  signIn: async (req: Request, res: Response) => {
    const body: SignInRequest = SignInRequestSchema.parse(req.body)
    const response: SignInResponse = await authUseCases.signIn(
      body.email,
      body.password
    )

    return res
      .status(200)
      .send(httpUtils.createResponse(true, 'User logged in', 200, response))
  }
}
