import { SignInResponse, SignUpRequest } from '@budget-trackr/dtos'
import logger from '../config/logger'
import { userRepository } from '../repositories/user.repository'
import { cognitoService } from '../services/cognito.service'

export const authUseCases = {
  signIn: async (email: string, password: string): Promise<SignInResponse> => {
    return await cognitoService.signIn(email, password)
  },

  signOutUseCase: (token: string, user: string) => {
    logger.info(`Signing out user ${user} ${token}`)
  },

  signUp: async (userData: SignUpRequest) => {
    const createInCognito = cognitoService.signUp(userData)
    const createInDb = userRepository.create(userData)

    Promise.all([createInCognito, createInDb]).then((values) => {
      const cognitoId = values[0]
      const user = values[1]
      userRepository.setCognitoId(user.id, cognitoId)
    })
  },

  resendCodeUseCase: (email: string) => {
    logger.info(`Resending code for email ${email}`)
  },

  confirmUserUseCase: (email: string, code: string) => {
    logger.info(`Confirming user with email ${email} ${code}`)
  },

  forgotPasswordUseCase: (email: string) => {
    logger.info(`Initiating forgot password for email ${email}`)
  },

  confirmForgotPasswordUseCase: (
    email: string,
    code: string,
    password: string
  ) => {
    logger.info(
      `Finishing forgot password for email ${email} ${code} ${password}`
    )
  },
}
