import {
  CreateUserRequest,
  CreateUserRequestSchema,
  UpdateUserRequest,
  UpdateUserRequestSchema,
} from '@budget-trackr/dtos'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { userService } from '../services/user.service'
import { httpUtils } from '../utils/http.utils'
import { validationUtils } from '../utils/validation.utils'

export const userController = {
  create: async (req: Request, res: Response) => {
    const body = validationUtils.safeParse<CreateUserRequest>(
      req.body,
      CreateUserRequestSchema
    )

    if (!body) {
      throw new createHttpError.BadRequest(
        'Body must have email, phone, name (first, last), and cognitoId.'
      )
    }

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

  update: async (req: Request, res: Response) => {
    const body = validationUtils.safeParse<UpdateUserRequest>(
      req.body,
      UpdateUserRequestSchema
    )

    if (!body) {
      throw new createHttpError.BadRequest(
        'Body must have email or phone or name with first and last.'
      )
    }

    await userService.update(body, req.userId!)

    return res
      .status(204)
      .send(httpUtils.createResponse(true, 'User updated successfully', 204))
  },
}
