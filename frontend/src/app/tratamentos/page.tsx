import { LuCirclePlus, LuSearch } from 'react-icons/lu';
import CardTratamentos from './../../components/cards/CardTratamentos';

export default function Tratamentos() {
  return (
    <div className='w-full'>
      <section className='flex flex-col gap-4 px-7 md:pl-4 md:pr-7 py-4'>
        <p className='text-2xl text-center md:text-start md:py-3 font-medium'>Tipos de Tratamentos</p>
        <div className='bg-white w-full rounded-2xl py-4 px-4 flex flex-col items-center justify-center gap-4'>
          <section className='w-full flex justify-center gap-2'>
            <div className='px-2 h-8 w-full flex bg-[#F1EDE3] rounded-lg items-center gap-2 shadow cursor-pointer'>
              <LuSearch className='text-[#6A5242]'/>
              <input type="text"
              placeholder="Buscar por tratamento"
              className='text-sm min-w-[145px] w-full'/>
            </div>
            <div className='hidden sm:flex w-fit px-2 justify-center items-center bg-[#6A5242] rounded-lg text-white gap-1 cursor-pointer shadow'>
              <LuCirclePlus />
              <button className='h-8 text-sm text-nowrap'>Novo tratamento</button>
            </div>
          </section>

          <div className='w-full flex flex-col flex-wrap gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          <CardTratamentos />
          <CardTratamentos />
          <CardTratamentos />
          <CardTratamentos />
          <CardTratamentos />
          <CardTratamentos />
          <CardTratamentos />
          <CardTratamentos />
          <CardTratamentos />
          <CardTratamentos />
          </div>
        </div>
      </section>
    </div>
  )
}
