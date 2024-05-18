import { CreateCardRequest } from '@budget-trackr/dtos'
import { Card } from '@prisma/client'
import prisma from '../config/prisma'

export const cardRepository = {
  create: async (data: CreateCardRequest, userId: string): Promise<Card> => {
    return await prisma.card.create({
      data: {
        ...data,
        userId: userId,
      },
    })
  },

  getOneByDescription: async (
    name: string,
    userId: string
  ): Promise<Card | null> => {
    return await prisma.card.findFirst({
      where: { name, userId },
    })
  },

  getAll: async (userId: string): Promise<Card[]> => {
    return await prisma.card.findMany({ where: { userId } })
  },

  getOneById: async (userId: string, cardId: string): Promise<Card | null> => {
    return await prisma.card.findUnique({
      where: { id: cardId, userId: userId },
    })
  },
}
