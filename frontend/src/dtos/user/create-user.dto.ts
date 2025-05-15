import { z } from "zod";
import { UserSchema } from "./user.schema";

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateUserType = z.infer<typeof CreateUserSchema>