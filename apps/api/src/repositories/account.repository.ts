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

  updateBalance: async (
    accountId: string,
    userId: string,
    isAddition: boolean,
    value: number
  ): Promise<void> => {
    const account = await prisma.account.findUnique({
      where: { id: accountId, userId: userId },
    })
    const newBalance = isAddition
      ? account!.balance + value
      : account!.balance - value

    await prisma.account.update({
      where: { userId, id: accountId },
      data: { balance: newBalance },
    })
  },
}
