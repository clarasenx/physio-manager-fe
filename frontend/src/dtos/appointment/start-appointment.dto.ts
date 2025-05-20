// update-appointment.dto.ts
import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'

export const StartAppointmentSchema = AppointmentSchema.pick({
  initialDiscomfort: true,
  notes: true,
}).extend({
  finalDiscomfort: AppointmentSchema.shape.finalDiscomfort.optional()
  .refine(value => !(typeof value === 'number' && value < 0), {message: 'O valor mínimo é 0'})
  .refine(value => !(typeof value === 'number' && value > 10), {message: 'O valor maxímo é 10'})
})

export type StartAppointmentType = z.infer<typeof StartAppointmentSchema>
