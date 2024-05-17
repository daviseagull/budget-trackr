import { z } from 'zod'

export const validationUtils = {
  safeParse: <T>(data: unknown, schema: z.ZodSchema): T | undefined => {
    const result = schema.safeParse(data)

    if (!result.success) {
      return undefined
    }

    return result.data!
  },
}
