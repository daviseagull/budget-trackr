import { CreateUserRequest } from '@budget-trackr/dtos'
import prisma from '../config/prisma'

export const userRepository = {
  create: async (userData: CreateUserRequest) => {
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
}
