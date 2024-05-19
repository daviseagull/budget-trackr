export * from './account'
export * from './account-transactions'
export * from './auth'
export * from './card'
export * from './category'
export * from './transfer'
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
