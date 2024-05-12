import { z } from 'zod'

export type ConfirmForgotPassword = z.infer<typeof ConfirmForgotPasswordSchema>

export const ConfirmForgotPasswordSchema = z.object({
  email: z.string(),
  code: z.string(),
  password: z.string(),
})
