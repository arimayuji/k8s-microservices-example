import {z} from "zod/v4"

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  passwordHash: z.string().min(6),
})

export type AuthUser = z.infer<typeof AuthUserSchema>