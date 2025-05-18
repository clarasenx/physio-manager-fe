import { z } from 'zod'
import { ScheduleStatus } from '@/enum/schedule-status.enum'
import { PatientSchema } from '../patient/patient.schema'

export const ScheduleSchema = z.object({
  id: z.number(),
  patientId: z.number({message: 'Selecione um paciente'}),
  appointmentTypeId: z.number({ message: 'Selecione um tratamento' }),  
  patient: PatientSchema.optional(),
  appointmentType: PatientSchema.optional(),
  date: z.date({message: 'Selecione uma data', invalid_type_error: 'Selecione uma data', required_error: 'Selecione uma data'}),
  notes: z.string().nullable().optional(),
  initialDiscomfort: z.number({message: 'Insira um valor'}).int().min(0, {message: 'O valor mínimo é 0'}).max(10, {message: 'O valor maxímo é 10'}),
  finalDiscomfort: z.number({message: 'Insira um valor'}).int().min(0, {message: 'O valor mínimo é 0'}).max(10, {message: 'O valor maxímo é 10'}),
  status: z.nativeEnum(ScheduleStatus),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type ScheduleType = z.infer<typeof ScheduleSchema>
