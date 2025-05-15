
import { ListScheduleType } from '@/dtos/schedule/list-schedule.dto'
import { isSameDay, isSameWeek, isSameMonth, format, getYear } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export type GroupedSchedules = {
  today: ListScheduleType[]
  thisWeek: ListScheduleType[]
  thisMonth: ListScheduleType[]
  months: Record<string, ListScheduleType[]>
}

export function groupSchedulesByDate(schedules: ListScheduleType[], todayDate = new Date()): GroupedSchedules {
  const today: ListScheduleType[] = []
  const thisWeek: ListScheduleType[] = []
  const thisMonth: ListScheduleType[] = []
  const months: Record<string, ListScheduleType[]> = {}

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

export function groupSchedulesByMonth(schedules: ListScheduleType[], todayDate = new Date()): Pick<GroupedSchedules, 'months'> {
  const months: Record<string, ListScheduleType[]> = {}

  const currentYear = getYear(todayDate)

  for (const schedule of schedules) {
    const date = schedule.date

    const scheduleYear = getYear(date)
    const monthKey = format(date, scheduleYear !== currentYear ? 'MMMM \'de\' yyyy' : 'MMMM', { locale: ptBR })

    if (!months[monthKey]) {
      months[monthKey] = []
    }
    months[monthKey].push(schedule)
  }

  return { months }
}