import { CategoryDto } from '@budget-trackr/dtos'
import prisma from '../config/prisma'

export const categoryRepository = {
  create: async (category: CategoryDto) => {
    return await prisma.category.create({ data: category })
  },

  createMany: async (categories: CategoryDto[]) => {
    return await prisma.category.createMany({ data: categories })
  },
}
