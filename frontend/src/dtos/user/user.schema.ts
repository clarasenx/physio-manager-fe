import { isValidCPF } from "@/utils/validate-cpf";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2, {message: 'insira no mínimo 2 caracteres.'}).max(100, {message: 'insira no máximo 100 caracteres.'}),
  email: z.string().email({message: 'email inválido.'}),
  register: z.string().refine(isValidCPF, {message: 'CPF inválido.'}),
  password: z.string().min(6, {message: 'insira no mínimo 6 caracteres.'}).max(100, {message: 'insira no máximo 100 caracteres.'}),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserType = z.infer<typeof UserSchema>