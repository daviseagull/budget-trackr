import { SignUpRequest } from '@budget-trackr/dtos'
import prisma from '../config/prisma'

export const userRepository = {
  create: async (signUpData: SignUpRequest) => {
    return prisma.user.create({
      data: {
        email: signUpData.email,
        name: signUpData.name,
        phone: signUpData.phone,
        country: signUpData.country,
      },
    })
  },

  setCognitoId: async (id: string, cognitoId: string) => {
    await prisma.user.update({
      where: { id: id },
      data: { cognitoId: cognitoId },
    })
  },
}
