import { z } from "zod";
import { AppointmentSchema } from "../appointment/appointment.schema";

export const PatientSchema = z.object({
  id: z.number(),
  name: z.string().min(3, { message: 'Insira no mínimo 3 caracteres' }).max(100, { message: 'Insira no máximo 100 caracteres' }),
  email: z
  .string()
  .max(0, { message: 'Email inválido' })
  .or(z.string().email({ message: 'Email inválido' }))
  .optional(),
  phone: z.string().min(11).max(11).optional().nullable(),
  birthday: z.coerce.date().optional(),
  lastCompletedAppointment: z.lazy((() => AppointmentSchema) as ()=> z.AnyZodObject).optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type PatientType = z.infer<typeof PatientSchema>