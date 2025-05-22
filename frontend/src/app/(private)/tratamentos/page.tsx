'use client'
import CardTratamentos from '@/components/cards/CardTratamentos';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { useTratamento } from '@/hooks/useTratamento';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { TratamentoDialog } from './components/formDialog';
import { SearchInput } from '@/components/searchInput';
import { Paginator } from '@/components/Paginator';

export default function Tratamentos() {
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  const auxSearch = useDebounce(search, 700)

  const tratamentos = useTratamento({ name: auxSearch })

  return (
    <section className='w-full flex flex-col gap-4 px-4 sm:px-8 mt-4 sm:mt-10'>
      <div className='flex justify-between w-full items-center'>
        <h2 className='text-2xl font-medium'>Tratamentos</h2>
        <div className='sm:hidden'>
          <TratamentoDialog>
            <Button><LuCirclePlus />Novo tratamento</Button>
          </TratamentoDialog>
        </div>
      </div>
      <div className='bg-white w-full h-full rounded-lg py-5 px-4 shadow'>
        <div className='w-full flex flex-col xs:flex-row justify-center gap-2'>
          <SearchInput onChange={setSearch} />
          <div className='hidden sm:block'>
            <TratamentoDialog>
              <Button><LuCirclePlus />Novo tratamento</Button>
            </TratamentoDialog>
          </div>
        </div>

        <div className='w-full mt-6 flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-auto max-h-[63dvh] md:max-h-[73dvh] sm:items-stretch py-1'>
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
        <div className='w-full flex items-end mt-5'>
          <Paginator
            page={page}
            setPage={setPage}
            hasMore={tratamentos.data?.meta.hasMore || false}
          />
        </div>
      </div>
    </section>
  )
}
