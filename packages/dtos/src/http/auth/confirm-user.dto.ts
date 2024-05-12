import { z } from 'zod'

export type ConfirmUserRequest = z.infer<typeof ConfirmUserRequestSchema>

export const ConfirmUserRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
})
