import {
  CreateAccountTransactionRequest,
  CreateAccountTransactionRequestSchema,
} from '@budget-trackr/dtos'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import logger from '../config/logger'
import { accountTransactionService } from '../services/account-transaction.service'
import { httpUtils } from '../utils/http.utils'
import { validationUtils } from '../utils/validation.utils'

export const accountTransactionController = {
  create: async (req: Request, res: Response) => {
    const body = validationUtils.safeParse<CreateAccountTransactionRequest>(
      req.body,
      CreateAccountTransactionRequestSchema
    )

    if (!body) {
      throw new createHttpError.BadRequest(
        'Body must have name, value, type, accountId, categoryId. description is optional.'
      )
    }

    logger.info(
      `Creating account transaction named ${body.name} for user ${req.userId} `
    )

    const data = await accountTransactionService.create(req.userId!, body)

    logger.info('Account transaction created successfully.')
    return res
      .status(200)
      .send(
        httpUtils.createResponse(
          true,
          'Account transaction created successfully',
          200,
          data
        )
      )
  },

  getByFilters: async (req: Request, res: Response) => {
    const account = req.query['account'] as string
    const type = req.query['type'] as string
    const fromDate = req.query['from-date'] as string
    const toDate = req.query['to-date'] as string

    logger.info(
      `Getting account transactions with filters: account (${account}) type (${type}) fromDate (${fromDate}) toDate (${toDate}))`
    )

    const data = await accountTransactionService.getByFilters(
      req.userId!,
      account,
      type,
      fromDate,
      toDate
    )

    logger.info(`Retrivied account transactions successfully.`)

    return res
      .status(200)
      .send(
        httpUtils.createResponse(
          true,
          'Retrivied account transactions successfully',
          200,
          data
        )
      )
  },

  getById: async (req: Request, res: Response) => {
    const accountTransactionId = req.params.id as string

    logger.info(
      `Getting account transaction ${accountTransactionId} of user ${req.userId} `
    )

    const data = await accountTransactionService.getById(
      accountTransactionId,
      req.userId!
    )

    logger.info(`Account transaction retrieved successfully.`)
    return res
      .status(200)
      .send(
        httpUtils.createResponse(
          true,
          'Account transaction retrieved successfully',
          200,
          data
        )
      )
  },
}
