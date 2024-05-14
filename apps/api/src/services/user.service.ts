import { CreateUserRequest, CreateUserResponse } from '@budget-trackr/dtos'
import { userRepository } from '../repositories/user.repository'
import { categoryService } from './category.service'

export const userService = {
  create: async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
    const user = await userRepository.create(userData)

    await categoryService.createDefaultCategories(user.id)

    return { id: user.id }
  },
}
