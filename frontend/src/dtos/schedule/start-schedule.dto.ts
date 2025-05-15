// update-schedule.dto.ts
import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'

export const StartScheduleSchema = ScheduleSchema.pick({
  initialDiscomfort: true,
  notes: true,
}).extend({
  finalDiscomfort: ScheduleSchema.shape.finalDiscomfort.optional()
  .refine(value => !(typeof value === 'number' && value < 0), {message: 'O valor mínimo é 0'})
  .refine(value => !(typeof value === 'number' && value > 10), {message: 'O valor maxímo é 10'})
})

export type StartScheduleType = z.infer<typeof StartScheduleSchema>
