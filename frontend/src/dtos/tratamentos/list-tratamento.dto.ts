import { z } from 'zod'
import { ResponseSchema } from '../response/response.schema'
import { TratamentoSchema } from './tratamento.schema'

export const ListTratamentoSchema = ResponseSchema(TratamentoSchema)

export type ListTratamentoType = z.infer<typeof ListTratamentoSchema>
