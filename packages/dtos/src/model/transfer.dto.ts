import { z } from 'zod'

export type TransferDto = z.infer<typeof TransferDtoSchema>

export const TransferDtoSchema = z.object({
  id: z.string(),
  origin: z.object({
    id: z.string(),
    description: z.string(),
  }),
  target: z.object({
    id: z.string(),
    description: z.string(),
  }),
  description: z.string(),
  date: z.date(),
  value: z.number(),
})
