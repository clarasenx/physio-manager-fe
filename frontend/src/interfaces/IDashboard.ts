import { ListAppointmentType } from "@/dtos/appointment/list-appointment.dto"

export interface IDashboard {
  totalPatients: number
  totalAppointmentsCompleted: number
  todayAppointments: ListAppointmentType
}