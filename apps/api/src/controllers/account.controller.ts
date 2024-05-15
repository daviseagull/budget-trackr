import { CreateAccountRequestSchema } from '@budget-trackr/dtos'
import { Request, Response } from 'express'
import { accountService } from '../services/account.service'
import { httpUtils } from '../utils/http.utils'

export const accountController = {
  create: async (req: Request, res: Response) => {
    const body = CreateAccountRequestSchema.parse(req.body)

    const data = await accountService.create(body, req.userId!)

    return res
      .status(200)
      .send(httpUtils.createResponse(true, 'Account created', 200, data))
  },

  getAll: async (req: Request, res: Response) => {
    const data = await accountService.getAll(req.userId!)

    return res
      .status(200)
      .send(
        httpUtils.createResponse(true, 'Got all accounts from user', 200, data)
      )
  },

  getOne: async (req: Request, res: Response) => {
    const accountId = req.params.id as string

    const data = await accountService.getOne(req.userId!, accountId)
    return res
      .status(200)
      .send(
        httpUtils.createResponse(true, 'Got one account from user', 200, data)
      )
  },
}
