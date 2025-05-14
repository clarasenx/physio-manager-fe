// update-schedule.dto.ts
import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'

export const StartScheduleSchema = ScheduleSchema.pick({
  initialDiscomfort: true,
  notes: true,
})

export type StartScheduleType = z.infer<typeof StartScheduleSchema>
