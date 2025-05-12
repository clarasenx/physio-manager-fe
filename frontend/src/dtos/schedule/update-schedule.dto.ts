// update-schedule.dto.ts
import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'
import { CreateScheduleSchema } from './create-schedule.dto'

export const UpdateScheduleSchema = ScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export type UpdateScheduleType = z.infer<typeof UpdateScheduleSchema>
