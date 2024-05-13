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

export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>

export const CreateUserResponseSchema = z.object({
  id: z.string(),
})
