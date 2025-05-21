'use client'

import { CardPatient, CardPatientMobile } from '@/components/cards/CardPatient';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { usePatient } from '@/hooks/usePatient';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { LuCirclePlus, LuSearch } from 'react-icons/lu';
import { PatientDialog } from './formDialog';

export default function Pacientes() {

  const [search, setSearch] = useState<string>('')

  const auxSearch = useDebounce(search, 700)

  const patient = usePatient({ search: auxSearch })

  return (
    <div className='flex flex-col h-full w-full items-center px-4 sm:px-8 pt-4 sm:py-5'>
      <div className='flex justify-around w-full items-center'>
        <p className='text-2xl text-center font-medium  my-4'>Pacientes</p>
        <div className='sm:hidden flex w-fit px-2 justify-center items-center bg-[#6A5242] rounded-lg text-white gap-1 cursor-pointer shadow'>
          <LuCirclePlus />
          <PatientDialog>
            <button className='h-7 text-sm text-nowrap cursor-pointer'>Novo paciente</button>
          </PatientDialog>
        </div>
      </div>

      <section className='bg-white w-full h-full rounded-lg py-5 px-4 shadow'>
        <div className='w-full flex justify-center gap-2'>
          <div className='px-2 h-8 w-full flex bg-[#F6F5F2] rounded-lg items-center gap-2 shadow cursor-pointer'>
            <LuSearch className='text-[#6A5242]' />
            <Input
              noFocusRing
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Buscar por tratamento"
              className='text-sm w-full border-0 shadow-none' />
          </div>
          <div className='hidden sm:flex w-fit px-2 justify-center items-center bg-[#6A5242] rounded-lg text-white gap-1 cursor-pointer shadow'>
            <LuCirclePlus />
            <PatientDialog>
              <button className='h-8 text-sm text-nowrap cursor-pointer'>Novo paciente</button>
            </PatientDialog>
          </div>
        </div>

        <div className='w-full flex pt-6 gap-3'>
          {/* Tabela com todos os pacientes */}
          <section className='w-full hidden lg:grid grid-cols-4 overflow-auto'>
            {
              patient.isLoading ? <div className='py-5 flex sm:col-span-full'>
                <CircularProgress className='mx-auto' />
              </div> :
                patient.isError ? <div className='sm:col-span-full'>
                  <ErrorMessage name='pacientes' refetch={patient.refetch} />
                </div> :
                  !patient.data?.data.length ? <p>{!auxSearch.length ? 'Não há pacientes cadastrados' : `Sem resultados encontrados`}</p> :
                    <table className="w-full col-span-4 overflow-hidden rounded-lg border border-gray-200 text-sm">
                      <thead>
                        <tr className="bg-[#F6F5F2] text-[#2D231C] text-left text-nowrap">
                          <th className="p-3">Nome</th>
                          <th className="p-3">Telefone</th>
                          <th className="p-3">Última consulta Concluída</th>
                          <th className="p-3 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          patient.data?.data.map((patient, index) => (
                            <CardPatient key={`patient-${index}`} patient={patient} />
                          ))
                        }
                      </tbody>
                    </table>
            }
          </section>

          {/* Cards de paciente individual mobile/telas menores*/}
          <section className='w-full overflow-auto max-h-[70dvh] flex flex-col gap-3 lg:hidden bg-[#F1EDE3] rounded-md px-2 py-4 sm:p-4'>
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

          {/* <section className='hidden w-fit text-nowrap text-[#2D231C] px-4 py-3 rounded-lg bg-[#F1EDE3]'>

            <p className='font-semibold text-lg px-3 pb-2'>{pacientes[ 0 ].nome}</p>

            <div className='bg-white px-4 py-3 rounded-lg'>
              <p className='font-semibold line-clamp-1'>Telefone</p>
              <p className='line-clamp-1'>{pacientes[ 0 ].telefone}</p>
              <p className='font-semibold line-clamp-1'>Última consulta</p>
              <p className='line-clamp-1'>{pacientes[ 0 ].ultimaConsulta}</p>
              <p className='font-semibold line-clamp-1'>Email</p>
              <p className='line-clamp-1'>{pacientes[ 0 ].email}</p>
            </div>

          </section> */}
        </div>
      </section>
    </div>
  )
}