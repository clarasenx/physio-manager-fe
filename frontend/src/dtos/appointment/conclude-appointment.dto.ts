// update-appointment.dto.ts
import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'

export const ConcludeAppointmentSchema = AppointmentSchema.pick({
  initialDiscomfort: true,
  finalDiscomfort: true,
  notes: true,
})

export type ConcludeAppointmentType = z.infer<typeof ConcludeAppointmentSchema>