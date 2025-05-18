import { z } from 'zod'

export const TratamentoSchema = z.object({
  id: z.number(),
  name: z.string({ message: 'Insira um nome' }).min(2, { message: 'Insira no mínimo 2 caracteres' }).max(100, { message: 'Insira no máximo 100 caracteres' }),
  description: z.string().max(255, { message: 'Insira no máximo 255 caracteres' }).nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TratamentoType = z.infer<typeof TratamentoSchema>
