import { z } from "zod";
import { UserSchema } from "./user.schema";

export const UserAuthSchema = UserSchema.pick({
  register: true,
  password: true
})

export type UserAuthType = z.infer<typeof UserAuthSchema>