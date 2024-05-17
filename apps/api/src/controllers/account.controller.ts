import {
  CreateAccountRequest,
  CreateAccountRequestSchema,
} from '@budget-trackr/dtos'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import logger from '../config/logger'
import { accountService } from '../services/account.service'
import { httpUtils } from '../utils/http.utils'
import { validationUtils } from '../utils/validation.utils'

export const accountController = {
  create: async (req: Request, res: Response) => {
    const body = validationUtils.safeParse<CreateAccountRequest>(
      req.body,
      CreateAccountRequestSchema
    )
    logger.info(`Creating account ${body?.description} for user ${req.userId} `)

    if (!body) {
      throw new createHttpError.BadRequest(
        'Body must have description, balance and type.'
      )
    }

    const data = await accountService.create(body, req.userId!)

    logger.info(
      `Account created successfully. accountId: ${data.id} user: ${req.userId}`
    )
    return res
      .status(200)
      .send(httpUtils.createResponse(true, 'Account created', 200, data))
  },

  getAll: async (req: Request, res: Response) => {
    logger.info(`Getting all accounts of user ${req.userId} `)

    const data = await accountService.getAll(req.userId!)

    logger.info(`Accounts retrieved successfully. user ${req.userId} `)
    return res
      .status(200)
      .send(
        httpUtils.createResponse(true, 'Got all accounts from user', 200, data)
      )
  },

  getOne: async (req: Request, res: Response) => {
    const accountId = req.params.id as string
    logger.info(`Getting account ${accountId} of user ${req.userId} `)

    const data = await accountService.getOne(req.userId!, accountId)

    logger.info(
      `Account retrieved successfully. accountId: ${accountId} user ${req.userId} `
    )
    return res
      .status(200)
      .send(
        httpUtils.createResponse(true, 'Got one account from user', 200, data)
      )
  },
}
