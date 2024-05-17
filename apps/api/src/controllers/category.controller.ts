import {
  CreateCategoryRequest,
  CreateCategoryRequestSchema,
} from '@budget-trackr/dtos'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import logger from '../config/logger'
import { categoryService } from '../services/category.service'
import { httpUtils } from '../utils/http.utils'
import { validationUtils } from '../utils/validation.utils'
export const categoryController = {
  create: async (req: Request, res: Response) => {
    const body = validationUtils.safeParse<CreateCategoryRequest>(
      req.body,
      CreateCategoryRequestSchema
    )

    if (!body) {
      throw new createHttpError.BadRequest(
        'Body must have description, color and type. parentId is optional.'
      )
    }

    logger.info(`Creating category ${body.description} for user ${req.userId} `)

    const data = await categoryService.create(body, req.userId!)

    logger.info(
      `Category created successfully. categoryId: ${data.id} user: ${req.userId}`
    )

    return res
      .status(200)
      .send(httpUtils.createResponse(true, 'Category created', 200, data))
  },

  getById: async (req: Request, res: Response) => {
    const categoryId = req.params.id as string
    logger.info(`Getting category ${categoryId} of user ${req.userId} `)

    const data = await categoryService.getById(req.userId!, categoryId)

    logger.info(
      `Category retrieved successfully. Category: ${categoryId} user ${req.userId} `
    )
    return res
      .status(200)
      .send(
        httpUtils.createResponse(
          true,
          'Category retrieved successfully',
          200,
          data
        )
      )
  },

  getByType: async (req: Request, res: Response) => {
    const type = req.query.type as string

    if (type.toUpperCase() !== 'INCOME' && type.toUpperCase() !== 'EXPENSE') {
      throw new createHttpError.BadRequest('Type must be income or expense.')
    }

    logger.info(`Getting categories of ${type} of user ${req.userId} `)

    const data = await categoryService.getByType(req.userId!, type)

    logger.info(
      `Categories retrieved successfully. Type: ${type} user ${req.userId} `
    )
    return res
      .status(200)
      .send(
        httpUtils.createResponse(
          true,
          'Categories retrieved successfully',
          200,
          data
        )
      )
  },
}
