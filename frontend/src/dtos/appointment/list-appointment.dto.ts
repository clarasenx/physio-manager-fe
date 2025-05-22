import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'
import { ResponseSchema } from '../response/response.schema';

export const ListAppointmentSchema = ResponseSchema(AppointmentSchema);

export type ListAppointmentType = z.infer<typeof ListAppointmentSchema>