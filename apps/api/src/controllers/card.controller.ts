import { CreateCardRequest, CreateCardRequestSchema } from '@budget-trackr/dtos'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import logger from '../config/logger'
import { cardService } from '../services/card.service'
import { httpUtils } from '../utils/http.utils'
import { validationUtils } from '../utils/validation.utils'

export const cardController = {
  create: async (req: Request, res: Response) => {
    const body = validationUtils.safeParse<CreateCardRequest>(
      req.body,
      CreateCardRequestSchema
    )

    if (!body) {
      throw new createHttpError.BadRequest(
        'Body must have name, dueDate, limit and brand.'
      )
    }

    logger.info(`Creating card ${body.name} for user ${req.userId} `)

    const data = await cardService.create(body, req.userId!)

    logger.info(
      `Card created successfully. cardId: ${data.id} user: ${req.userId}`
    )

    return res
      .status(200)
      .send(httpUtils.createResponse(true, 'Card created', 200, data))
  },

  getAll: async (req: Request, res: Response) => {
    logger.info(`Getting all cards of user ${req.userId} `)

    const data = await cardService.getAll(req.userId!)

    logger.info(`Cards retrieved successfully. user ${req.userId} `)

    return res
      .status(200)
      .send(
        httpUtils.createResponse(
          true,
          'Retrieved all user cards successfully',
          200,
          data
        )
      )
  },

  getById: async (req: Request, res: Response) => {
    const cardId = req.params.id as string
    logger.info(`Getting card ${cardId} of user ${req.userId} `)

    const data = await cardService.getOne(req.userId!, cardId)

    logger.info(
      `Card retrieved successfully. cardId: ${cardId} user ${req.userId} `
    )
    return res
      .status(200)
      .send(
        httpUtils.createResponse(true, 'Retrieved card successfully', 200, data)
      )
  },
}
