import { z } from 'zod'

export type CategoryDto = z.infer<typeof CategoryDtoSchema>

export const CategoryDtoSchema = z.object({
  id: z.optional(z.string()),
  parentId: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  userId: z.string(),
  description: z.string().max(20),
  color: z.string(),
  type: z.enum(['INCOME', 'EXPENSE']),
  createdAt: z.date(),
  updatedAt: z.date(),
})
