import { z } from 'zod'

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>

export const UpdateUserRequestSchema = z.object({
  email: z.optional(z.string().email()),
  phone: z.string(),
  name: z.optional(
    z.object({
      first: z.string(),
      last: z.string(),
    })
  ),
})
