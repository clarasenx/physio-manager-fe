import api from '@/api/axios'
import { PatientType } from '@/dtos/patient/patient.schema'
import { UpdatePatientType } from '@/dtos/patient/update-patient.dto'
import { useQuery } from '@tanstack/react-query'

export const patientKey = 'patient'

export const usePatient = (filter?: UpdatePatientType) => useQuery<PatientType[]>({
  queryKey: [patientKey, filter],
  queryFn: async ()=> (await api.get('patient')).data,
  retry: 3
})