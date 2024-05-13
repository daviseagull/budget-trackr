export * from './user'

export type ApiResponse<T> = {
  success: boolean
  message: string
  statusCode: number
  data?: T
}
