import api from '@/api/axios'
import { ListScheduleType } from '@/dtos/schedule/list-schedule.dto'
import { ScheduleFilterType } from '@/dtos/schedule/schedule-filter.dto'
import { useQuery } from '@tanstack/react-query'

export const scheduleKey = 'schedule'

export const useSchedule = (filter?: ScheduleFilterType) => useQuery<ListScheduleType[]>({
  queryKey: [scheduleKey, filter],
  queryFn: async ()=> {
    const res = (await api.get<ListScheduleType[]>('schedule', {params: filter})).data
    const aux = res.map(r => ({...r, date: new Date(r.date)}))
    return aux
  },
  retry: 3
})