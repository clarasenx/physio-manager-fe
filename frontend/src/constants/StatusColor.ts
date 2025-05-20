import { AppointmentStatus } from "@/enum/appointment-status.enum";

export const StatusColor: Record<AppointmentStatus, string> = {
  CANCELED: 'red-800',
  COMPLETED: 'green-800',
  SCHEDULED: 'amber-600'
}

