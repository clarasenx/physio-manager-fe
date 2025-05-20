import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'

export const ListAppointmentSchema = AppointmentSchema.extend({
  initialDiscomfort: AppointmentSchema.shape.initialDiscomfort.nullable(),
  finalDiscomfort: AppointmentSchema.shape.finalDiscomfort.nullable(),
});

export type ListAppointmentType = z.infer<typeof ListAppointmentSchema>