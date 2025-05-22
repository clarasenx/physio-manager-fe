'use client'

import { CardPatientTable, CardPatientMobile, PatientDetails } from '@/components/cards/CardPatient';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useDebounce } from '@/hooks/useDebounce';
import { usePatient } from '@/hooks/usePatient';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { PatientDialog } from './components/formDialog';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/searchInput';
import { PatientType } from '@/dtos/patient/patient.schema';
import { Paginator } from '@/components/Paginator';

export default function Pacientes() {

  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  const auxSearch = useDebounce(search, 700)

  const [showPatientDetails, setShowPatientDetails] = useState<PatientType | null>()

  const patient = usePatient({ search: auxSearch, page, perPage: 10 })

  return (
    <section className='w-full flex flex-col gap-4 px-4 sm:px-8 mt-4 sm:mt-10'>
      <div className='flex justify-between w-full items-center'>
        <h2 className='text-2xl text-center font-medium'>Pacientes</h2>
        <div className='sm:hidden'>
          <PatientDialog>
            <Button><LuCirclePlus />Novo paciente</Button>
          </PatientDialog>
        </div>
      </div>

      <div className='bg-white w-full h-full rounded-lg py-5 px-4 shadow'>
        <div className='w-full flex justify-center gap-2'>
          <SearchInput onChange={setSearch} />

          <div className='hidden sm:block'>
            <PatientDialog>
              <Button><LuCirclePlus />Novo paciente</Button>
            </PatientDialog>
          </div>
        </div>

        <div className='w-full flex items-start mt-6 gap-3'>
          {/* Tabela com todos os pacientes */}
          <section className='w-full hidden  lg:block overflow-auto'>
            {
              patient.isLoading ? <div className='py-5 flex'>
                <CircularProgress className='mx-auto' />
              </div> :
                patient.isError ? <div>
                  <ErrorMessage name='pacientes' refetch={patient.refetch} />
                </div> :
                  !patient.data?.data.length ? <p>{!auxSearch.length ? 'Não há pacientes cadastrados' : `Sem resultados encontrados`}</p> :
                    <>
                      <table className="w-full col-span-4 overflow-hidden rounded-lg border border-gray-200 text-sm">
                        <thead>
                          <tr className="bg-[#F6F5F2] text-[#2D231C] text-left text-nowrap">
                            <th className="p-3">Nome</th>
                            <th className="p-3">Telefone</th>
                            <th className="p-3 text-wrap">Última consulta Concluída</th>
                            <th className="p-3 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            patient.data?.data.map((patient, index) => (
                              <CardPatientTable
                                key={`patient-${index}`}
                                patient={patient}
                                setShowPatientDetails={setShowPatientDetails}
                              />
                            ))
                          }
                        </tbody>
                      </table>
                      <div className='w-full flex items-end mt-10'>
                        <Paginator
                          page={page}
                          setPage={setPage}
                          hasMore={patient.data?.meta.hasMore || false}
                        />
                      </div>
                    </>
            }
          </section>

          {/* Cards de paciente individual mobile/telas menores*/}
          <div className='flex flex-col w-full lg:hidden'>
            <section className='w-full overflow-auto h-fit max-h-[59dvh] md:max-h-[73dvh] flex flex-col gap-3 bg-[#F1EDE3] rounded-md px-2 py-3 sm:p-4'>
              {
                patient.isLoading ? <div className='py-5 flex sm:col-span-full'>
                  <CircularProgress className='mx-auto' />
                </div> :
                  patient.isError ? <div className='sm:col-span-full'>
                    <ErrorMessage name='pacientes' refetch={patient.refetch} />
                  </div> :
                    !patient.data?.data.length ? <p>Não há pacientes cadastrados</p> :

                      patient.data?.data.map((patient, index) => (
                        <CardPatientMobile key={`patient-mobile-${index}`} patient={patient} />
                      ))
              }
            </section>
            <div className='w-full flex items-end mt-5'>
              <Paginator
                page={page}
                setPage={setPage}
                hasMore={patient.data?.meta.hasMore || false}
              />
            </div>
          </div>

          {
            showPatientDetails &&
            <PatientDetails
              patient={showPatientDetails}
              close={() => setShowPatientDetails(null)}
            />
          }
        </div>
      </div>
    </section>
  )
}