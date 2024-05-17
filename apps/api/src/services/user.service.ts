import {
  CreateResourceResponse,
  CreateUserRequest,
  UpdateUserRequest,
  UserDto,
  UserDtoSchema,
} from '@budget-trackr/dtos'
import createHttpError from 'http-errors'
import logger from '../config/logger'
import { userRepository } from '../repositories/user.repository'
import { authService } from './auth.service'
import { categoryService } from './category.service'

export const userService = {
  create: async (
    userData: CreateUserRequest
  ): Promise<CreateResourceResponse> => {
    const user = await userRepository.create(userData)

    await categoryService.createDefaultCategories(user.id)
    await authService.updateIdAttribute(userData.cognitoId, user.id)

    return { id: user.id }
  },

  get: async (userId: string): Promise<UserDto> => {
    logger.info(`Getting user with id ${userId}`)
    const user = await userRepository.get(userId)

    if (!user) {
      throw new createHttpError.BadRequest('User not found')
    }

    return UserDtoSchema.parse(user)
  },

  update: async (
    userData: UpdateUserRequest,
    userId: string,
    cognitoId: string
  ): Promise<void> => {
    if (!userData.name && !userData.phone)
      throw new createHttpError.BadRequest(
        'Must pass at least one attribute to be updated.'
      )

    Promise.all([
      userRepository.update(userData, userId),
      authService.updateUser(userData, cognitoId),
    ])
  },
}
