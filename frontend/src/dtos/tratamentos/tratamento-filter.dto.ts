import { z } from 'zod';
import { TratamentoSchema } from './tratamento.schema';

export const TratamentoFilterSchema = z.object({
  name: TratamentoSchema.shape.name.min(0),
  page: z.coerce.number().int().min(1),
  perPage: z.coerce.number().int().min(1).max(100)
}).partial()

export type TratamentoFilterType = z.infer<typeof TratamentoFilterSchema>
