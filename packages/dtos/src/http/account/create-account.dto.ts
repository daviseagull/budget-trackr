import { z } from 'zod'

export type CreateAccountRequest = z.infer<typeof CreateAccountRequestSchema>

export const CreateAccountRequestSchema = z.object({
  description: z.string(),
  balance: z.number(),
  type: z.enum(['WALLET', 'SAVINGS', 'INVESTMENTS', 'CHEQUING']),
})
