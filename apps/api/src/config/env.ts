import { z } from 'zod'

const envSchema = z.object({
  ENV: z.enum(['PRD', 'STG', 'DEV', 'LOC']),
  PORT: z.coerce.number().nonnegative(),
  LOG_LEVEL: z.enum([
    'error',
    'warn',
    'info',
    'http',
    'verbose',
    'debug',
    'silly',
  ]),
  DATABASE_URL: z.string().url(),
  REGION: z.string(),
})

export const env = envSchema.parse(process.env)
