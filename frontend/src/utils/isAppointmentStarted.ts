import { AppointmentType } from "@/dtos/appointment/appointment.schema";
import { AppointmentStatus } from "@/enum/appointment-status.enum";

export const isAppointmentStarted = (appointment: AppointmentType) =>
  appointment.status === AppointmentStatus.SCHEDULED &&
  typeof appointment.initialDiscomfort === 'number'