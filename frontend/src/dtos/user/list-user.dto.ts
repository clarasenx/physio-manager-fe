import { z } from "zod";
import { UserSchema } from "./user.schema";

export const ListUserSchema = UserSchema.omit({
  password: true
})

export type ListUserType = z.infer<typeof ListUserSchema>