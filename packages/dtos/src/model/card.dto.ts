import { z } from 'zod'

export type CardDto = z.infer<typeof CardDtoSchema>

export const CardDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  limit: z.number().min(0),
  brand: z.enum(['MASTERCARD', 'VISA', 'AMEX']),
  dueDate: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
