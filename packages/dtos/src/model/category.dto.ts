import { z } from 'zod'

export type CategoryDto = z.infer<typeof CategoryDtoSchema>

export const CategoryDtoSchema = z.object({
  id: z.optional(z.string()),
  parentId: z.optional(z.string()),
  userId: z.string(),
  description: z.string().max(20),
  color: z.string(),
  type: z.enum(['INCOME', 'EXPENSE']),
})
