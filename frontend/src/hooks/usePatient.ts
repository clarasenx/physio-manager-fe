import api from '@/api/axios'
import { FilterPatientType } from '@/dtos/patient/filter-patient.dto'
import { ListPatientType } from '@/dtos/patient/list-patient.dto'
import { useQuery } from '@tanstack/react-query'

export const patientKey = 'patient'

export const usePatient = (filter?: FilterPatientType) => useQuery<ListPatientType>({
  queryKey: [ patientKey, filter ],
  queryFn: async () => (await api.get('patient', { params: filter })).data,
  retry: 3
})