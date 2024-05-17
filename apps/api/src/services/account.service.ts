import {
  AccountDto,
  AccountDtoSchema,
  CreateAccountRequest,
  CreateResourceResponse,
} from '@budget-trackr/dtos'
import createHttpError from 'http-errors'
import logger from '../config/logger'
import { accountRepository } from '../repositories/account.repository'

export const accountService = {
  create: async (
    data: CreateAccountRequest,
    userId: string
  ): Promise<CreateResourceResponse> => {
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

  getAll: async (userId: string): Promise<AccountDto[]> => {
    return await accountRepository.getAll(userId)
  },

  getOne: async (userId: string, accountId: string): Promise<AccountDto> => {
    const account = await accountRepository.getOneById(userId, accountId)
    if (!account) {
      throw new createHttpError.BadRequest(`Account ${accountId} not found`)
    }
    return AccountDtoSchema.parse(account)
  },
}
