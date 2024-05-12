import { z } from 'zod'

export type SignUpRequest = z.infer<typeof SignUpRequestSchema>

export const SignUpRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.object({
    first: z.string(),
    last: z.string(),
  }),
  phone: z.object({
    country: z.string(),
    areaCode: z.number(),
    number: z.number(),
  }),
})
