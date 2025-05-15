import { ScheduleStatus } from "@/enum/schedule-status.enum";

export const StatusView: Record<ScheduleStatus, string> = {
  COMPLETED: 'Concluída',
  SCHEDULED: 'Agendada',
  CANCELED: 'Cancelada',
}

