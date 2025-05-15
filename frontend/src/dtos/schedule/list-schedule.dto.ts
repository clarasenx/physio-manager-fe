import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'

export const ListScheduleSchema = ScheduleSchema.extend({
  initialDiscomfort: ScheduleSchema.shape.initialDiscomfort.nullable(),
  finalDiscomfort: ScheduleSchema.shape.finalDiscomfort.nullable(),
});

export type ListScheduleType = z.infer<typeof ListScheduleSchema>