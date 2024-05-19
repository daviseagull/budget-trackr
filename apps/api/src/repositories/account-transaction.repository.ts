import { CreateAccountTransactionRequest } from '@budget-trackr/dtos'
import { AccountTransaction } from '@prisma/client'
import prisma from '../config/prisma'

export const accountTransactionRepository = {
  create: async (
    userId: string,
    data: CreateAccountTransactionRequest
  ): Promise<AccountTransaction> => {
    return await prisma.accountTransaction.create({
      data: {
        ...data,
        userId,
      },
    })
  },

  delete: async (id: string): Promise<void> => {
    await prisma.accountTransaction.delete({ where: { id } })
  },

  getById: async (accountTransactionId: string, userId: string) => {
    return await prisma.accountTransaction.findUnique({
      where: { id: accountTransactionId, userId: userId },
      include: { account: true, category: true },
    })
  },

  getByFilters: async (
    userId: string,
    acccountId?: string,
    type?: string,
    fromDate?: string,
    toDate?: string
  ) => {
    let conditionals = {}
    conditionals = { ...conditionals, userId }

    if (acccountId) {
      conditionals = { ...conditionals, acccountId }
    }

    if (type) {
      conditionals = { ...conditionals, type }
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

    return await prisma.accountTransaction.findMany({
      where: conditionals,
      include: { account: true, category: true },
    })
  },
}
