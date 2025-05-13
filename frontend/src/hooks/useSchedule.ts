import api from '@/api/axios'
import { ScheduleType } from '@/dtos/schedule/schedule.schema'
import { UpdateScheduleType } from '@/dtos/schedule/update-schedule.dto'
import { useQuery } from '@tanstack/react-query'

export const scheduleKey = 'schedule'

export const useSchedule = (filter?: UpdateScheduleType) => useQuery<ScheduleType[]>({
  queryKey: [scheduleKey, filter],
  queryFn: async ()=> (await api.get('schedule', {params: filter})).data,
  retry: 3
})