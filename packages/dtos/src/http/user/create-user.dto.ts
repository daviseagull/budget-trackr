import { z } from 'zod'

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>

export const CreateUserRequestSchema = z.object({
  cognitoId: z.string(),
  email: z.string().email(),
  phone: z.string(),
  name: z.object({
    first: z.string(),
    last: z.string(),
  }),
})
