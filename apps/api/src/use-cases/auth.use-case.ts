import { SignUpRequest } from '@budget-trackr/dtos'
import logger from '../config/logger'

export const SignInUseCase = (email: string, password: string) => {
  logger.info(`Trying to log in user ${email} ${password}`)
}

export const SignOutUseCase = (token: string, user: string) => {
  logger.info(`Signing out user ${user} ${token}`)
}

export const SignUpUseCase = (userData: SignUpRequest) => {
  logger.info(`Signing up user ${userData.email}`)
}

export const ResendCodeUseCase = (email: string) => {
  logger.info(`Resending code for email ${email}`)
}

export const ConfirmUserUseCase = (email: string, code: string) => {
  logger.info(`Confirming user with email ${email} ${code}`)
}

export const ForgotPasswordUseCase = (email: string) => {
  logger.info(`Initiating forgot password for email ${email}`)
}

export const ConfirmForgotPasswordUseCase = (
  email: string,
  code: string,
  password: string
) => {
  logger.info(
    `Finishing forgot password for email ${email} ${code} ${password}`
  )
}
