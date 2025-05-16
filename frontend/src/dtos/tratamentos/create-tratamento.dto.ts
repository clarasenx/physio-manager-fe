import { z } from 'zod'
import { TratamentoSchema } from './tratamento.schema'

export const CreateTratamentoSchema = TratamentoSchema.pick({
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateTratamentoType = z.infer<typeof CreateTratamentoSchema>
