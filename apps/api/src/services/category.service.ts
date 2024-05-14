import { CategoryDto, CategoryDtoSchema } from '@budget-trackr/dtos'
import defaultCategories from '../../schemas/default-categories.json'
import { categoryRepository } from '../repositories/category.repository'

export const categoryService = {
  createDefaultCategories: async (userId: string) => {
    const categories: CategoryDto[] = defaultCategories.map(
      (defaultCategory) => {
        const category = CategoryDtoSchema.parse(defaultCategory)
        category.userId = userId
        return category
      }
    )

    await categoryRepository.createMany(categories)
  },
}
