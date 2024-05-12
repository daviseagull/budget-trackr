import { z } from 'zod'

export type SignInRequest = z.infer<typeof SignInRequestSchema>

export const SignInRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type SignInResponse = z.infer<typeof SignInResponseSchema>

export const SignInResponseSchema = z.object({
  accessToken: z.string(),
  type: z.string(),
})
