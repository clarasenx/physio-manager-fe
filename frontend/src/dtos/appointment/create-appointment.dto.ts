import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'

export const CreateAppointmentSchema = AppointmentSchema.omit({
  id: true,
  createdAt: true,
  initialDiscomfort: true,
  finalDiscomfort: true,
  status: true,
  updatedAt: true,
})

export type CreateAppointmentType = z.infer<typeof CreateAppointmentSchema>
