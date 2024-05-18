import { CreateAccountRequest } from '@budget-trackr/dtos'
import { Account } from '@prisma/client'
import prisma from '../config/prisma'

export const accountRepository = {
  create: async (
    data: CreateAccountRequest,
    userId: string
  ): Promise<Account> => {
    return await prisma.account.create({
      data: {
        ...data,
        userId: userId,
      },
    })
  },

  getAll: async (userId: string): Promise<Account[]> => {
    return await prisma.account.findMany({ where: { userId } })
  },

  getOneById: async (
    userId: string,
    accountId: string
  ): Promise<Account | null> => {
    return await prisma.account.findUnique({
      where: { id: accountId, userId: userId },
    })
  },

  getOneByDescription: async (
    description: string,
    userId: string
  ): Promise<Account | null> => {
    return await prisma.account.findFirst({
      where: { description, userId },
    })
  },

  transfer: async (
    originId: string,
    targetId: string,
    userId: string,
    value: number
  ) => {
    await prisma.$transaction([
      prisma.account.update({
        where: { id: originId, userId: userId },
        data: {
          balance: {
            decrement: value,
          },
        },
      }),
      prisma.account.update({
        where: { id: targetId, userId: userId },
        data: {
          balance: {
            increment: value,
          },
        },
      }),
    ])
  },
}
