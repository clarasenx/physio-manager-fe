import api from '@/api/axios'
import { IDashboard } from '@/interfaces/IDashboard'
import { useQuery } from '@tanstack/react-query'

export const dashboardKey = 'dashboard'

export const useDashboard = () => useQuery<IDashboard>({
  queryKey: [dashboardKey],
  queryFn: async ()=> {
    const res = (await api.get('dashboard')).data as IDashboard
    const aux = {...res}
    aux.todaySchedules = res.todaySchedules.map(r => ({...r, date: new Date(r.date)}))
    return aux
  },
  retry: 3
})