

import { AppointmentType } from '@/dtos/appointment/appointment.schema'
import { isSameDay, isSameWeek, isSameMonth, format, getYear, isPast } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export type GroupedAppointments = {
  past: AppointmentType[]
  today: AppointmentType[]
  thisWeek: AppointmentType[]
  thisMonth: AppointmentType[]
  months: Record<string, AppointmentType[]>
}

export function groupAppointmentsByDate(appointments: AppointmentType[], todayDate = new Date()): GroupedAppointments {
  const past: AppointmentType[] = []
  const today: AppointmentType[] = []
  const thisWeek: AppointmentType[] = []
  const thisMonth: AppointmentType[] = []
  const months: Record<string, AppointmentType[]> = {}

  const currentYear = getYear(todayDate)

  for (const appointment of appointments) {
    const date = appointment.date
    
    if(isPast(date) && appointment.status) {
      past.push(appointment)
    }else if (isSameDay(date, todayDate)) {
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

  return { past, today, thisWeek, thisMonth, months }
}

export function groupAppointmentsByMonth(appointments: AppointmentType[], todayDate = new Date()): Pick<GroupedAppointments, 'months'> {
  const months: Record<string, AppointmentType[]> = {}

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