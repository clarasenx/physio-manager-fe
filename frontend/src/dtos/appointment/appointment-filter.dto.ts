// update-appointment.dto.ts
import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'

export const AppointmentFilterSchema = AppointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  initialDate: z.coerce.date(),
  finalDate: z.coerce.date(),
  page: z.coerce.number().int(),
  perPage: z.coerce.number().int(),
}).partial()

export type AppointmentFilterType = z.infer<typeof AppointmentFilterSchema>
