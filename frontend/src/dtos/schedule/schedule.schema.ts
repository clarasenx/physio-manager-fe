import { z } from 'zod'
import { ScheduleStatus } from '@/enum/schedule-status.enum'
import { PatientSchema } from '../patient/patient.schema'

export const ScheduleSchema = z.object({
  id: z.number(),
  patientId: z.number({message: 'Selecione um paciente'}),
  patient: PatientSchema.optional(),
  date: z.date({message: 'Selecione uma data', invalid_type_error: 'Selecione uma data', required_error: 'Selecione uma data'}),
  notes: z.string().nullable().optional(),
  initialDiscomfort: z.number().int().min(0).max(10).nullable(),
  finalDiscomfort: z.number().int().min(0).max(10).nullable(),
  status: z.nativeEnum(ScheduleStatus),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

export type ScheduleType = z.infer<typeof ScheduleSchema>
