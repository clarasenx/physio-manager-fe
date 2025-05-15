import { ScheduleStatus } from "@/enum/schedule-status.enum";

export const StatusColor: Record<ScheduleStatus, string> = {
  CANCELED: 'red-800',
  COMPLETED: 'green-800',
  SCHEDULED: 'amber-600'
}

