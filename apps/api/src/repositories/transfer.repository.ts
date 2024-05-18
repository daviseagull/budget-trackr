import { CreateTransferRequest } from '@budget-trackr/dtos'
import { Transfer } from '@prisma/client'
import prisma from '../config/prisma'

export const transferRepository = {
  create: async (
    originId: string,
    userId: string,
    data: CreateTransferRequest
  ): Promise<Transfer> => {
    return await prisma.transfer.create({
      data: {
        ...data,
        userId,
        originId,
      },
    })
  },

  delete: async (id: string): Promise<void> => {
    await prisma.transfer.delete({ where: { id } })
  },
}
