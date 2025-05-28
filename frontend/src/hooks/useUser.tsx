import api from '@/api/axios'
import { ListUserType } from '@/dtos/user/list-user.dto'
import { useQuery } from '@tanstack/react-query'

export const userKey = 'user'

export const useUser = () => useQuery<ListUserType>({
  queryKey: [ userKey ],
  queryFn: async () => (await api.get('user-infos')).data as ListUserType,
  retry: 3
})