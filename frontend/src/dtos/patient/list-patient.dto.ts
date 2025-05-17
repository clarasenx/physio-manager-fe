import { z } from 'zod';
import { ResponseSchema } from '../response/response.schema';
import { PatientSchema } from "./patient.schema";

export const ListPatientSchema = ResponseSchema(PatientSchema)

export type ListPatientType = z.infer<typeof ListPatientSchema>;
