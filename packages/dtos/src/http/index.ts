export * from './auth/confirm-forgot-password.dto'
export * from './auth/confirm-user.dto'
export * from './auth/sign-in.dto'
export * from './auth/sign-up.dto'

export type ApiResponse<T> = {
  success: boolean
  message: string
  statusCode: number
  data?: T
}
