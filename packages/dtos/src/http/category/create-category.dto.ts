import { z } from 'zod'

export type CreateCategoryRequest = z.infer<typeof CreateCategoryRequestSchema>

export const CreateCategoryRequestSchema = z.object({
  parentId: z.optional(z.string()),
  description: z
    .string()
    .max(20)
    .transform(
      (data) => data.charAt(0).toUpperCase() + data.substring(1).toLowerCase()
    ),
  color: z.string(),
  type: z.enum(['INCOME', 'EXPENSE']),
})
