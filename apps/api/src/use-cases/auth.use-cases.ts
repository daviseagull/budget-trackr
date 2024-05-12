import { SignInResponse, SignUpRequest } from '@budget-trackr/dtos'
import logger from '../config/logger'
import { cognitoService } from '../services/cognito.service'

export const authUseCases = {
  signIn: async (email: string, password: string): Promise<SignInResponse> => {
    return await cognitoService.signIn(email, password)
  },

  signOutUseCase: (token: string, user: string) => {
    logger.info(`Signing out user ${user} ${token}`)
  },

  signUpUseCase: (userData: SignUpRequest) => {
    logger.info(`Signing up user ${userData.email}`)
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
