import {
  CategoryDto,
  CategoryDtoSchema,
  CreateCategoryRequest,
  CreateCategoryRequestSchema,
  CreateResourceResponse,
} from '@budget-trackr/dtos'
import createHttpError from 'http-errors'
import defaultCategories from '../../schemas/default-categories.json'
import { categoryRepository } from '../repositories/category.repository'

export const categoryService = {
  createDefaultCategories: async (userId: string): Promise<void> => {
    const categories: CreateCategoryRequest[] = defaultCategories.map(
      (defaultCategory) => {
        return CreateCategoryRequestSchema.parse(defaultCategory)
      }
    )

    await categoryRepository.createMany(categories, userId)
  },

  create: async (
    data: CreateCategoryRequest,
    userId: string
  ): Promise<CreateResourceResponse> => {
    const isAlreadyCreated = await categoryRepository.getOneByDescription(
      data.description,
      userId
    )

    if (isAlreadyCreated) {
      throw new createHttpError.BadRequest(
        `Category with the description ${data.description} already exists for user ${userId}`
      )
    }

    if (data.parentId) {
      const parentCategory = await categoryRepository.getById(
        userId,
        data.parentId
      )

      if (!parentCategory) {
        throw new createHttpError.BadRequest("Could't found parent category.")
      }

      if (parentCategory.type !== data.type) {
        throw new createHttpError.BadRequest(
          `Can't create a child category with different type of parent.`
        )
      }
    }

    const category = await categoryRepository.create(data, userId)

    return { id: category.id }
  },

  getById: async (userId: string, categoryId: string): Promise<CategoryDto> => {
    const category = await categoryRepository.getById(userId, categoryId)
    if (!category) {
      throw new createHttpError.BadRequest(`Category ${categoryId} not found`)
    }
    return CategoryDtoSchema.parse(category)
  },

  getByType: async (userId: string, type: string): Promise<CategoryDto[]> => {
    const categories = await categoryRepository.getByType(userId, type)

    return categories.map((category) => CategoryDtoSchema.parse(category))
  },
}
