import { CreateUserRequestSchema } from '@budget-trackr/dtos'
import { Request, Response } from 'express'
import { userUseCases } from '../use-cases/user.use-cases'
import { httpUtils } from '../utils/http.utils'

export const userController = {
  create: async (req: Request, res: Response) => {
    const body = CreateUserRequestSchema.parse(req.body)
    const responseData = await userUseCases.create(body)

    return res
      .status(200)
      .send(httpUtils.createResponse(true, 'User created', 200, responseData))
  },
}
