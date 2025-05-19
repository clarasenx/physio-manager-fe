import api from '@/api/axios'
import { ListTratamentoType } from '@/dtos/tratamentos/list-tratamento.dto'
import { TratamentoFilterType } from '@/dtos/tratamentos/tratamento-filter.dto'
import { useQuery } from '@tanstack/react-query'

export const tratamentoKey = 'tratamento'

export const useTratamento = (params?: TratamentoFilterType) => useQuery<ListTratamentoType>({
  queryKey: [ tratamentoKey, params ],
  queryFn: async () => (await api.get('appointment-type', {params})).data as ListTratamentoType,
  retry: 3
})