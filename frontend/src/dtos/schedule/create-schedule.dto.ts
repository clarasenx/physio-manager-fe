import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'

export const CreateScheduleSchema = ScheduleSchema.omit({
  id: true,
  createdAt: true,
  initialDiscomfort: true,
  finalDiscomfort: true,
  status: true,
  updatedAt: true,
})

export type CreateScheduleType = z.infer<typeof CreateScheduleSchema>
