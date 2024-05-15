import { z } from 'zod'

export type AccountDto = z.infer<typeof AccountDtoSchema>

export const AccountDtoSchema = z.object({
  id: z.string(),
  description: z.string(),
  balance: z.number(),
  type: z.enum(['WALLET', 'SAVINGS', 'INVESTMENTS', 'CHEQUING']),
  createdAt: z.date(),
  updatedAt: z.date(),
})
