import { CreateAccountRequest } from '@budget-trackr/dtos'
import prisma from '../config/prisma'

export const accountRepository = {
  create: async (data: CreateAccountRequest, userId: string) => {
    return await prisma.account.create({
      data: {
        ...data,
        userId: userId,
      },
    })
  },

  getAll: async (userId: string) => {
    return await prisma.account.findMany({ where: { userId } })
  },

  getOneById: async (userId: string, accountId: string) => {
    return await prisma.account.findUnique({
      where: { id: accountId, userId: userId },
    })
  },

  getOneByDescription: async (description: string, userId: string) => {
    return await prisma.account.findFirst({
      where: { description, userId },
    })
  },
}
