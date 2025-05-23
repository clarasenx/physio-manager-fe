import api from "@/api/axios";
import { AppointmentFilterType } from "@/dtos/appointment/appointment-filter.dto";
import { ListAppointmentType } from "@/dtos/appointment/list-appointment.dto";
import { useInfiniteQuery } from "@tanstack/react-query";

export const appointmentInfiniteKey = 'appointment-infinite'

export const useInfiniteAppointment = (filter?: Omit<AppointmentFilterType, 'page'>) => useInfiniteQuery<ListAppointmentType>({
  queryKey: [appointmentInfiniteKey, filter],
  queryFn: async ({ pageParam: page }) => {
    
    const res = (await api.get<ListAppointmentType>('appointment', { params: {...filter, page} })).data
    const auxData = res.data.map(r => ({ ...r, date: new Date(r.date) }))
    return {
      data: auxData,
      meta: res.meta
    }
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.meta.page+1,
  getPreviousPageParam: (lastPage) => lastPage.meta.page-1,
  retry: 3
})