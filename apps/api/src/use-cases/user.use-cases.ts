import { CreateUserRequest, CreateUserResponse } from '@budget-trackr/dtos'
import { userRepository } from '../repositories/user.repository'

export const userUseCases = {
  create: async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
    const user = await userRepository.create(userData)

    return { id: user.id }
  },
}
