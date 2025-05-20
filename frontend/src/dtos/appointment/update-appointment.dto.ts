// update-appointment.dto.ts
import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'

export const UpdateAppointmentSchema = AppointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export type UpdateAppointmentType = z.infer<typeof UpdateAppointmentSchema>
