import { z } from 'zod'

export type CreateTransferRequest = z.infer<typeof CreateTransferRequestSchema>

export const CreateTransferRequestSchema = z.object({
  originId: z.string(),
  targetId: z.string(),
  value: z.number().min(0),
  date: z.coerce.date().max(new Date()),
  description: z.string().max(64).nullish(),
})
