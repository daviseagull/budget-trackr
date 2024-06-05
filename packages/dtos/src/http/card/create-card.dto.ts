import { z } from 'zod'

export type CreateCardRequest = z.infer<typeof CreateCardRequestSchema>

export const CreateCardRequestSchema = z.object({
  name: z.string().max(20),
  dueDate: z.number().min(1).max(31),
  limit: z.number().min(0),
  brand: z.enum(['MASTERCARD', 'VISA', 'AMEX']),
})
