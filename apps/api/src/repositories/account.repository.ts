import { CreateAccountRequest } from '@budget-trackr/dtos'
import { Account, TransactionType } from '@prisma/client'
import logger from '../config/logger'
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

  addTransaction: async (
    accountId: string,
    userId: string,
    type: string,
    value: number
  ) => {
    logger.info(
      `accountID: ${accountId}, userId: ${userId}, type: ${type},  value: ${value}`
    )
    if (type === TransactionType.EXPENSE) {
      logger.info('entrei')
      prisma.account.update({
        where: { id: accountId, userId },
        data: {
          balance: {
            decrement: value,
          },
        },
      })
    }

    if (type === TransactionType.INCOME) {
      logger.info('aqui')

      await prisma.account.update({
        where: { id: accountId, userId },
        data: {
          balance: {
            increment: value,
          },
        },
      })
    }
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
