import { ListScheduleType } from "@/dtos/schedule/list-schedule.dto";
import { ScheduleStatus } from "@/enum/schedule-status.enum";

export const isScheduleStarted = (schedule: ListScheduleType) =>
  schedule.status === ScheduleStatus.SCHEDULED &&
  typeof schedule.initialDiscomfort === 'number'