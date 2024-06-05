import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { authService } from '../services/auth.service'
import { httpUtils } from '../utils/http.utils'

export const authController = {
  signIn: async (req: Request, res: Response) => {
    const code = req.body.code

    if (!code) {
      throw new createHttpError.BadRequest('Must have a code header')
    }

    const data = await authService.signIn(code)

    return res
      .status(200)
      .send(httpUtils.createResponse(true, 'User LoggedIn', 200, data))
  },

  signOut: async (req: Request, res: Response) => {
    await authService.signOut(req.token!)

    return res
      .status(204)
      .send(httpUtils.createResponse(true, 'Token revoked successfully', 204))
  },
}
