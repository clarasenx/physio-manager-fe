'use client'
import CardTratamentos from '@/components/cards/CardTratamentos';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { useTratamento } from '@/hooks/useTratamento';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { LuCirclePlus, LuSearch } from 'react-icons/lu';
import { TratamentoDialog } from './components/formDialog';

export default function Tratamentos() {
  const [ search, setSearch ] = useState<string>('')

  const auxSearch = useDebounce(search, 700)

  const tratamentos = useTratamento({ name: auxSearch })

  return (
    <section className='w-full flex flex-col gap-4 px-4 sm:px-8 pt-5'>
      <p className='text-2xl text-center md:text-start md:py-3 font-medium'>Tipos de Tratamentos</p>
      <div className='bg-white w-full rounded-2xl py-4 px-4 flex flex-col items-center justify-center gap-4'>
        <section className='w-full flex flex-col xs:flex-row justify-center gap-2'>
          <div className='px-2 h-8 w-full flex bg-[#F1EDE3] rounded-lg items-center gap-2 shadow cursor-pointer'>
            <LuSearch className='text-[#6A5242]' />
            <Input
              noFocusRing
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Buscar por tratamento"
              className='text-sm w-full border-0 shadow-none' />
          </div>
          <TratamentoDialog>
            <Button><LuCirclePlus />Novo tratamento</Button>
          </TratamentoDialog>
        </section>

        <div className='w-full flex flex-col flex-wrap gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-auto sm:max-h-[60dvh] lg:max-h-[70dvh] sm:items-stretch py-1'>
          {
            tratamentos.isLoading ? <div className='py-5 flex sm:col-span-full'>
              <CircularProgress className='mx-auto' />
            </div> :
              tratamentos.isError ? <div className='sm:col-span-full'>
                <ErrorMessage name='tratamentos' refetch={tratamentos.refetch} />
              </div> :
                !tratamentos.data?.data.length ? <p>{!auxSearch.length ? 'Não há tratamentos cadastrados' : `Sem resultados encontrados`}</p> :
                  tratamentos.data?.data.map((tratamento) => (
                    <CardTratamentos key={`cardsTratamento${tratamento.id}`} tratamento={tratamento} />
                  ))
          }
        </div>
      </div>
    </section>
  )
}
