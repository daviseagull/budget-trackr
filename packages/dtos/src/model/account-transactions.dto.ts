import { z } from 'zod'

export type AccountTransactionDto = z.infer<typeof AccountTransactionDtoSchema>

export const AccountTransactionDtoSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  account: z.object({
    id: z.string(),
    description: z.string(),
  }),
  category: z.object({
    id: z.string(),
    description: z.string(),
  }),
  name: z.string(),
  description: z.string().nullish(),
  value: z.number(),
  type: z.enum(['INCOME', 'EXPENSE']),
})
