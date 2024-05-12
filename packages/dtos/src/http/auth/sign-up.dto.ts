import { z } from 'zod'

export type SignUpRequest = z.infer<typeof SignUpRequestSchema>

export const SignUpRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
  country: z.enum(['CAN', 'USA', 'BRA', 'GER', 'FRA']),
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
