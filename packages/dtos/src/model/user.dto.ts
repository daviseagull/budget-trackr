import { z } from 'zod'

export type UserDto = z.infer<typeof UserDtoSchema>

export const UserDtoSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  phone: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
