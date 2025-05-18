import { z } from 'zod'
import { TratamentoSchema } from './tratamento.schema'

export const CreateTratamentoSchema = TratamentoSchema.pick({
  name: true,
  description: true,
})

export type CreateTratamentoType = z.infer<typeof CreateTratamentoSchema>
