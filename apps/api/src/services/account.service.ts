import {
  CreateAccountRequest,
  CreateAccountResponse,
} from '@budget-trackr/dtos'
import createHttpError from 'http-errors'
import logger from '../config/logger'
import { accountRepository } from '../repositories/account.repository'

export const accountService = {
  create: async (
    data: CreateAccountRequest,
    userId: string
  ): Promise<CreateAccountResponse> => {
    const isAlreadyCreated = await accountRepository.getOneByDescription(
      data.description,
      userId
    )

    logger.info(JSON.stringify(isAlreadyCreated))
    if (isAlreadyCreated) {
      throw new createHttpError.BadRequest(
        `Account with the description ${data.description} already exists`
      )
    }

    const account = await accountRepository.create(data, userId)

    return { id: account.id }
  },

  getAll: async (userId: string) => {
    return await accountRepository.getAll(userId)
  },

  getOne: async (userId: string, accountId: string) => {
    return await accountRepository.getOneById(userId, accountId)
  },
}
