import { z } from 'zod'

export type CreateCategoryRequest = z.infer<typeof CreateCategoryRequestSchema>

export const CreateCategoryRequestSchema = z.object({
  parentId: z.optional(z.string()),
  description: z.string(),
  color: z.string(),
  type: z.enum(['INCOME', 'EXPENSE']),
})
