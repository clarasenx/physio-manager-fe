import { AppointmentStatus } from "@/enum/appointment-status.enum";

export const StatusView: Record<AppointmentStatus, string> = {
  COMPLETED: 'Concluída',
  SCHEDULED: 'Agendada',
  CANCELED: 'Cancelada',
}

