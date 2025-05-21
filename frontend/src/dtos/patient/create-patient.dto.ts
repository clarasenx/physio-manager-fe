import { z } from "zod";
import { PatientSchema } from "./patient.schema";

export const CreatePatientSchema = PatientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastCompletedAppointment: true
})

export type CreatePatientType = z.infer<typeof CreatePatientSchema>
