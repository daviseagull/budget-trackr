export * from './account'
export * from './auth'
export * from './user'

export type CreateResourceResponse = {
  id: string
}

export type ApiResponse<T> = {
  success: boolean
  message: string
  statusCode: number
  data?: T
}
