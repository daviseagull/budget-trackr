import { CreateUserRequest, UpdateUserRequest } from '@budget-trackr/dtos'
import { User } from '@prisma/client'
import prisma from '../config/prisma'

export const userRepository = {
  create: async (userData: CreateUserRequest): Promise<User> => {
    const user = await prisma.user.create({
      data: {
        cognitoId: userData.cognitoId,
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
      },
    })

    return user
  },

  get: async (userId: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id: userId } })
  },

  update: async (userData: UpdateUserRequest, userId: string) => {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: userData,
    })
  },
}
