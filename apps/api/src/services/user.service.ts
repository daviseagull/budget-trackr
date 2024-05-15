import {
  CreateUserRequest,
  CreateUserResponse,
  UserDto,
  UserDtoSchema,
} from '@budget-trackr/dtos'
import createHttpError from 'http-errors'
import { userRepository } from '../repositories/user.repository'
import { authService } from './auth.service'
import { categoryService } from './category.service'

export const userService = {
  create: async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
    const user = await userRepository.create(userData)

    await categoryService.createDefaultCategories(user.id)
    await authService.updateIdAttribute(userData.cognitoId, user.id)

    return { id: user.id }
  },

  get: async (userId: string): Promise<UserDto> => {
    const user = await userRepository.get(userId)

    if (!user) {
      throw new createHttpError.BadRequest('User not found')
    }

    return UserDtoSchema.parse(user)
  },
}
