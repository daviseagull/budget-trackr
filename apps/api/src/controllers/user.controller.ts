import { CreateUserRequestSchema } from '@budget-trackr/dtos'
import { Request, Response } from 'express'
import { userService } from '../services/user.service'
import { httpUtils } from '../utils/http.utils'

export const userController = {
  create: async (req: Request, res: Response) => {
    const body = CreateUserRequestSchema.parse(req.body)
    const responseData = await userService.create(body)

    return res
      .status(200)
      .send(httpUtils.createResponse(true, 'User created', 200, responseData))
  },

  get: async (req: Request, res: Response) => {
    const data = await userService.get(req.userId!)

    return res
      .status(200)
      .send(httpUtils.createResponse(true, 'User retrivied', 200, data))
  },
}
