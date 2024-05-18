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

  getByFilters: async (
    userId: string,
    originId?: string,
    targetId?: string,
    fromDate?: string,
    toDate?: string
  ) => {
    let conditionals = {}
    conditionals = { ...conditionals, userId }

    if (originId) {
      conditionals = { ...conditionals, originId }
    }

    if (targetId) {
      conditionals = { ...conditionals, targetId }
    }

    if (fromDate && !toDate) {
      conditionals = { ...conditionals, date: { gte: new Date(fromDate) } }
    }

    if (toDate && !fromDate) {
      conditionals = { ...conditionals, date: { lte: new Date(toDate) } }
    }

    if (toDate && fromDate) {
      conditionals = {
        ...conditionals,
        date: { lte: new Date(toDate), gte: new Date(fromDate) },
      }
    }

    return await prisma.transfer.findMany({
      where: conditionals,
      include: { origin: true, target: true },
    })
  },
}
