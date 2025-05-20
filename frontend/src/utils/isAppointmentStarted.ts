import { ListAppointmentType } from "@/dtos/appointment/list-appointment.dto";
import { AppointmentStatus } from "@/enum/appointment-status.enum";

export const isAppointmentStarted = (appointment: ListAppointmentType) =>
  appointment.status === AppointmentStatus.SCHEDULED &&
  typeof appointment.initialDiscomfort === 'number'