// update-schedule.dto.ts
import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'

export const ConcludeScheduleSchema = ScheduleSchema.pick({
  initialDiscomfort: true,
  finalDiscomfort: true,
  notes: true,
})

export type ConcludeScheduleType = z.infer<typeof ConcludeScheduleSchema>