import { z } from 'zod'

export type SignUpResponse = z.infer<typeof SignUpResponseSchema>

export const SignUpResponseSchema = z.object({
  token: z.string(),
  expiresIn: z.number(),
  type: z.enum(['ACCESS', 'ID', 'REFRESH']),
})
