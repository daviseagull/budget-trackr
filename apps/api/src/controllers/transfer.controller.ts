import {
  CreateTransferRequest,
  CreateTransferRequestSchema,
} from '@budget-trackr/dtos'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import logger from '../config/logger'
import { transferService } from '../services/transfer.service'
import { httpUtils } from '../utils/http.utils'
import { validationUtils } from '../utils/validation.utils'

export const transferController = {
  create: async (req: Request, res: Response) => {
    const body = validationUtils.safeParse<CreateTransferRequest>(
      req.body,
      CreateTransferRequestSchema
    )

    if (!body) {
      throw new createHttpError.BadRequest(
        'Body must have target, value, date. Description is optional.'
      )
    }

    if (body.originId === body.targetId) {
      throw new createHttpError.BadRequest('Must be different accounts.')
    }

    logger.info(
      `Transfering ${body.value} from ${body.originId} to ${body.targetId}`
    )

    const data = await transferService.transfer(req.userId!, body)

    logger.info(`Transfer made successfully.`)

    return res
      .status(200)
      .send(
        httpUtils.createResponse(true, 'Transfer made successfully', 200, data)
      )
  },

  getByFilters: async (req: Request, res: Response) => {
    const origin = req.query['origin'] as string
    const target = req.query['target'] as string
    const fromDate = req.query['from-date'] as string
    const toDate = req.query['to-date'] as string

    logger.info(
      `Getting transfers with filters: origin (${origin}) target (${target}) fromDate (${fromDate}) toDate (${toDate}))`
    )

    const data = await transferService.getByFilters(
      req.userId!,
      origin,
      target,
      fromDate,
      toDate
    )

    logger.info(`Retrivied transfers successfully.`)

    return res
      .status(200)
      .send(
        httpUtils.createResponse(
          true,
          'Retrivied transfers successfully',
          200,
          data
        )
      )
  },
}
