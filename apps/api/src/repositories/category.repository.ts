import { CreateCategoryRequest } from '@budget-trackr/dtos'
import { Category, CategoryType } from '@prisma/client'
import prisma from '../config/prisma'

export const categoryRepository = {
  create: async (category: CreateCategoryRequest, userId: string) => {
    return await prisma.category.create({ data: { ...category, userId } })
  },

  createMany: async (
    categories: CreateCategoryRequest[],
    userId: string
  ): Promise<void> => {
    const prismaCategories = categories.map((category) => {
      const prismaType =
        category.type === 'INCOME' ? CategoryType.INCOME : CategoryType.EXPENSE

      return {
        userId,
        parentId: category.parentId,
        description: category.description,
        type: prismaType,
        color: category.color,
      }
    })

    await prisma.category.createMany({ data: prismaCategories })
  },

  getByType: async (userId: string, type: string): Promise<Category[]> => {
    const prismaType =
      type === 'INCOME' ? CategoryType.INCOME : CategoryType.EXPENSE

    return await prisma.category.findMany({
      where: { type: prismaType, userId },
    })
  },

  getById: async (
    userId: string,
    categoryId: string
  ): Promise<Category | null> => {
    return await prisma.category.findUnique({
      where: { id: categoryId, userId: userId },
    })
  },

  getOneByDescription: async (
    description: string,
    userId: string
  ): Promise<Category | null> => {
    return await prisma.category.findFirst({
      where: { description, userId },
    })
  },
}
