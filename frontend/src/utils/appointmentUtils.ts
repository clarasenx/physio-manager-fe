
import { ListAppointmentType } from '@/dtos/appointment/list-appointment.dto'
import { isSameDay, isSameWeek, isSameMonth, format, getYear } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export type GroupedAppointments = {
  today: ListAppointmentType[]
  thisWeek: ListAppointmentType[]
  thisMonth: ListAppointmentType[]
  months: Record<string, ListAppointmentType[]>
}

export function groupAppointmentsByDate(appointments: ListAppointmentType[], todayDate = new Date()): GroupedAppointments {
  const today: ListAppointmentType[] = []
  const thisWeek: ListAppointmentType[] = []
  const thisMonth: ListAppointmentType[] = []
  const months: Record<string, ListAppointmentType[]> = {}

  const currentYear = getYear(todayDate)

  for (const appointment of appointments) {
    const date = appointment.date

    if (isSameDay(date, todayDate)) {
      today.push(appointment)
    } else if (isSameWeek(date, todayDate, { weekStartsOn: 1 })) {
      thisWeek.push(appointment)
    } else if (isSameMonth(date, todayDate)) {
      thisMonth.push(appointment)
    } else {
      const appointmentYear = getYear(date)
      const monthKey = format(date, appointmentYear !== currentYear ? 'MMMM \'de\' yyyy' : 'MMMM', { locale: ptBR })

      if (!months[monthKey]) {
        months[monthKey] = []
      }
      months[monthKey].push(appointment)
    }
  }

  return { today, thisWeek, thisMonth, months }
}

export function groupAppointmentsByMonth(appointments: ListAppointmentType[], todayDate = new Date()): Pick<GroupedAppointments, 'months'> {
  const months: Record<string, ListAppointmentType[]> = {}

  const currentYear = getYear(todayDate)

  for (const appointment of appointments) {
    const date = appointment.date

    const appointmentYear = getYear(date)
    const monthKey = format(date, appointmentYear !== currentYear ? 'MMMM \'de\' yyyy' : 'MMMM', { locale: ptBR })

    if (!months[monthKey]) {
      months[monthKey] = []
    }
    months[monthKey].push(appointment)
  }

  return { months }
}