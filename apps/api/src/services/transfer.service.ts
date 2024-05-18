import {
  CreateResourceResponse,
  CreateTransferRequest,
  TransferDtoSchema,
} from '@budget-trackr/dtos'
import createHttpError from 'http-errors'
import { transferRepository } from '../repositories/transfer.repository'
import { accountUtils } from '../utils/account.utils'
import { accountService } from './account.service'

const verifyIfTransferAccountsExists = async (
  originId: string,
  targetId: string,
  userId: string
) => {
  const originExists = await accountUtils.verifyIfExistsById(originId, userId)
  const targetExists = await accountUtils.verifyIfExistsById(targetId, userId)

  if (originExists) {
    throw new createHttpError.BadRequest(
      `Origin account ${originId} doesn't exists.`
    )
  }

  if (targetExists) {
    throw new createHttpError.BadRequest(
      `Target account ${originId} doesn't exists.`
    )
  }
}

export const transferService = {
  transfer: async (
    userId: string,
    data: CreateTransferRequest
  ): Promise<CreateResourceResponse> => {
    verifyIfTransferAccountsExists(data.originId, data.targetId, userId)

    const transfer = await transferRepository.create(
      data.originId,
      userId,
      data
    )

    try {
      await accountService.transfer(
        data.originId,
        data.targetId,
        userId,
        data.value
      )
    } catch (err) {
      transferRepository.delete(transfer.id)
      throw new createHttpError.InternalServerError(
        `Error trying to transfer ${data.value} from ${data.originId} to ${data.targetId}`
      )
    }

    return { id: transfer.id }
  },

  getByFilters: async (
    userId: string,
    originId?: string,
    targetId?: string,
    fromDate?: string,
    toDate?: string
  ) => {
    const transfers = await transferRepository.getByFilters(
      userId,
      originId,
      targetId,
      fromDate,
      toDate
    )

    return transfers.map((transfer) => TransferDtoSchema.parse(transfer))
  },
}
