import { z } from 'zod';
import { UpdatePatientSchema } from './update-patient.dto';

export const FilterPatientSchema = UpdatePatientSchema.extend({
  page: z.coerce.number(),
  perPage: z.coerce.number(),
  search: z.string(),
}).partial();

export type FilterPatientType = z.infer<typeof FilterPatientSchema>;