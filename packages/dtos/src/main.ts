import { z } from 'zod'
type Name = {
  first: string
  last: string
}

type Phone = {
  country: string
  areaCode: number
  number: number
}

export type SignUpRequest = {
  password: string
  email: string
  name: Name
  birthday: Date
  phone: Phone
}

export type ApiResponse<T> = {
  statusCode: number
  success: boolean
  message: string
  data?: T
}

export type SignInRequest = z.infer<typeof SignInRequestSchema>

export const SignInRequestSchema = z.object({
  email: z.string(),
  password: z.string()
})

export type SignInResponse = z.infer<typeof SignInResponseSchema>
export const SignInResponseSchema = z.object({
  accessToken: z.string(),
  type: z.string()
})

export type ConfirmUserRequest = {
  email: string
  code: string
}

export type ConfirmForgotPassword = {
  email: string
  code: string
  password: string
}
