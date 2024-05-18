import {
  AccountDto,
  AccountDtoSchema,
  CreateAccountRequest,
  CreateResourceResponse,
} from '@budget-trackr/dtos'
import createHttpError from 'http-errors'
import { accountRepository } from '../repositories/account.repository'
import { accountUtils } from '../utils/account.utils'

export const accountService = {
  create: async (
    data: CreateAccountRequest,
    userId: string
  ): Promise<CreateResourceResponse> => {
    const exists = await accountUtils.verifyIfExistsByDescription(
      data.description,
      userId
    )

    if (exists) {
      throw new createHttpError.BadRequest(
        `Account with the description ${data.description} already exists`
      )
    }

    const account = await accountRepository.create(data, userId)

    return { id: account.id }
  },

  getAll: async (userId: string): Promise<AccountDto[]> => {
    const accounts = await accountRepository.getAll(userId)

    return accounts.map((account) => AccountDtoSchema.parse(account))
  },

  getOne: async (userId: string, accountId: string): Promise<AccountDto> => {
    const account = await accountRepository.getOneById(userId, accountId)
    if (!account) {
      throw new createHttpError.BadRequest(`Account ${accountId} not found`)
    }
    return AccountDtoSchema.parse(account)
  },

  updateBalance: async (
    accountId: string,
    userId: string,
    isAddition: boolean,
    value: number
  ): Promise<void> => {
    await accountRepository.updateBalance(accountId, userId, isAddition, value)
  },
}
