import { z } from "zod";
import { PatientSchema } from "./patient.schema";
import { CreatePatientSchema } from "./create-patient.dto";

export const UpdatePatientSchema = CreatePatientSchema.partial()

export type UpdatePatientType = z.infer<typeof UpdatePatientSchema>
