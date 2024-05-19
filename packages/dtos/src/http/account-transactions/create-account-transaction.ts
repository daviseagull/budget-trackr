import { z } from 'zod'

export type CreateAccountTransactionRequest = z.infer<
  typeof CreateAccountTransactionRequestSchema
>

export const CreateAccountTransactionRequestSchema = z.object({
  accountId: z.string(),
  categoryId: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  value: z.number(),
  date: z.coerce.date().max(new Date()),
  type: z.enum(['INCOME', 'EXPENSE']),
})
