
import { ScheduleType } from '@/dtos/schedule/schedule.schema'
import { isSameDay, isSameWeek, isSameMonth, format, getYear } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export type GroupedSchedules = {
  today: ScheduleType[]
  thisWeek: ScheduleType[]
  thisMonth: ScheduleType[]
  months: Record<string, ScheduleType[]>
}

export function groupSchedulesByDate(schedules: ScheduleType[], todayDate = new Date()): GroupedSchedules {
  const today: ScheduleType[] = []
  const thisWeek: ScheduleType[] = []
  const thisMonth: ScheduleType[] = []
  const months: Record<string, ScheduleType[]> = {}

  const currentYear = getYear(todayDate)

  for (const schedule of schedules) {
    const date = schedule.date

    if (isSameDay(date, todayDate)) {
      today.push(schedule)
    } else if (isSameWeek(date, todayDate, { weekStartsOn: 1 })) {
      thisWeek.push(schedule)
    } else if (isSameMonth(date, todayDate)) {
      thisMonth.push(schedule)
    } else {
      const scheduleYear = getYear(date)
      const monthKey = format(date, scheduleYear !== currentYear ? 'MMMM \'de\' yyyy' : 'MMMM', { locale: ptBR })
      
      if (!months[monthKey]) {
        months[monthKey] = []
      }
      months[monthKey].push(schedule)
    }
  }

  return { today, thisWeek, thisMonth, months }
}