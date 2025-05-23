import { z } from "zod";
import { UserSchema } from "./user.schema";

export const UpdateUserSchema = UserSchema.omit({
  id: true,
  password: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export type UpdateUserType = z.infer<typeof UpdateUserSchema>