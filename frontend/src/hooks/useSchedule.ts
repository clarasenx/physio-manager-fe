import api from '@/api/axios'
import { ScheduleFilterType } from '@/dtos/schedule/schedule-filter.dto'
import { ScheduleType } from '@/dtos/schedule/schedule.schema'
import { useQuery } from '@tanstack/react-query'

export const scheduleKey = 'schedule'

export const useSchedule = (filter?: ScheduleFilterType) => useQuery<ScheduleType[]>({
  queryKey: [scheduleKey, filter],
  queryFn: async ()=> {
    const res = (await api.get<ScheduleType[]>('schedule', {params: filter})).data
    const aux = res.map(r => ({...r, date: new Date(r.date)}))
    return aux
  },
  retry: 3
})