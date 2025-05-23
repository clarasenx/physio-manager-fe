import { z } from "zod";
import { UserSchema } from "./user.schema";

export const RequestResetPasswordSchema = UserSchema.pick({
  email: true
})

export type RequestResetPasswordType = z.infer<typeof RequestResetPasswordSchema>

export const ResetPasswordSchema = UserSchema.pick({
  email: true,
  password: true
}).extend({
  token: z.string().length(8, {message: 'O código deve ter 8 caracteres'})
})

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>