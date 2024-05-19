import {
  AccountTransactionDtoSchema,
  CreateAccountTransactionRequest,
  CreateResourceResponse,
} from '@budget-trackr/dtos'
import createHttpError from 'http-errors'
import { accountTransactionRepository } from '../repositories/account-transaction.repository'
import { accountService } from './account.service'
import { categoryService } from './category.service'

export const accountTransactionService = {
  create: async (
    userId: string,
    data: CreateAccountTransactionRequest
  ): Promise<CreateResourceResponse> => {
    await accountService.getOne(userId, data.accountId)

    const category = await categoryService.getById(userId, data.categoryId)

    if (category.type !== data.type) {
      throw new createHttpError.BadRequest(
        `Category ${data.categoryId} type doesn't equals to selected type.`
      )
    }

    const transaction = await accountTransactionRepository.create(userId, data)

    try {
      await accountService.addTransaction(
        data.accountId,
        userId,
        data.type,
        data.value
      )
    } catch (err) {
      await accountTransactionRepository.delete(transaction.id)
      throw new createHttpError.InternalServerError(
        `Error trying to create an account transaction for account ${data.accountId}`
      )
    }

    return { id: transaction.id }
  },

  getById: async (accountTransactionId: string, userId: string) => {
    const accountTransaction = await accountTransactionRepository.getById(
      accountTransactionId,
      userId
    )
    return AccountTransactionDtoSchema.parse(accountTransaction)
  },

  getByFilters: async (
    userId: string,
    accountId?: string,
    type?: string,
    fromDate?: string,
    toDate?: string
  ) => {
    const transactions = await accountTransactionRepository.getByFilters(
      userId,
      accountId,
      type,
      fromDate,
      toDate
    )

    return transactions.map((transaction) =>
      AccountTransactionDtoSchema.parse(transaction)
    )
  },
}
