import api from '@/api/axios'
import { ListAppointmentType } from '@/dtos/appointment/list-appointment.dto'
import { AppointmentFilterType } from '@/dtos/appointment/appointment-filter.dto'
import { useQuery } from '@tanstack/react-query'

export const appointmentKey = 'appointment'

export const useAppointment = (filter?: AppointmentFilterType) => useQuery<ListAppointmentType[]>({
  queryKey: [appointmentKey, filter],
  queryFn: async ()=> {
    const res = (await api.get<ListAppointmentType[]>('appointment', {params: filter})).data
    const aux = res.map(r => ({...r, date: new Date(r.date)}))
    return aux
  },
  retry: 3
})