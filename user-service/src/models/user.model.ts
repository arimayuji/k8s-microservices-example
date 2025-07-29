import { z } from 'zod/v4'

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
})
export type User = z.infer<typeof UserSchema>