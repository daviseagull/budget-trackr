import { ApiResponse } from '@budget-trackr/dtos'

export const httpUtils = {
  createResponse<T>(
    success: boolean,
    message: string,
    statusCode: number,
    data?: T
  ): ApiResponse<T> {
    return {
      success,
      message,
      statusCode,
      data,
    }
  },
}
