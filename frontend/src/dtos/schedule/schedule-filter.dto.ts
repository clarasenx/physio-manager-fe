// update-schedule.dto.ts
import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'

export const ScheduleFilterSchema = ScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  initialDate: z.coerce.date(),
  finalDate: z.coerce.date(),
}).partial()

export type ScheduleFilterType = z.infer<typeof ScheduleFilterSchema>
