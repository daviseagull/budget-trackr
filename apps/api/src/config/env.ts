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
  COGNITO_URL: z.string().url(),
  APP_URL: z.string().url(),
  COGNITO_CLIENT_SECRET: z.string(),
  COGNITO_CLIENT_ID: z.string(),
  COGNITO_USER_POOL_ID: z.string(),
})

export const env = envSchema.parse(process.env)
