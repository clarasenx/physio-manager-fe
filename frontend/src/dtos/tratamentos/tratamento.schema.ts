import { z } from 'zod'

export const TratamentoSchema = z.object({
  id: z.number(),
  name: z.string({message: 'Insira um nome'}),
  description: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type ScheduleType = z.infer<typeof TratamentoSchema>
