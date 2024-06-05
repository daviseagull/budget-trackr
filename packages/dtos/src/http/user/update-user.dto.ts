import { z } from 'zod'

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>

export const UpdateUserRequestSchema = z.object({
  phone: z.optional(z.string()),
  name: z.optional(
    z.object({
      first: z
        .string()
        .transform(
          (data) =>
            data.charAt(0).toUpperCase() + data.substring(1).toLowerCase()
        ),
      last: z
        .string()
        .transform(
          (data) =>
            data.charAt(0).toUpperCase() + data.substring(1).toLowerCase()
        ),
    })
  ),
})
