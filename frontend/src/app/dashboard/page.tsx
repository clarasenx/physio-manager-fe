'use client'
import { HiDotsVertical } from 'react-icons/hi';
import { LuCalendarDays, LuSquareCheck, LuUser } from 'react-icons/lu';

export default function Dashboard() {

  return (
    <div className='flex flex-col w-full items-center px-8 py-10 sm:py-5'>
      {/* Primeira seção, de boas vindas */}
      <section className='flex flex-col w-full items-center md:items-start  text-[#2D231C] pb-5'>
        <p className='text-3xl py-2'>
          Seja bem-vindo (a)!
        </p>
        <p className='text-sm'>Vamos dar uma olhada no que temos para hoje</p>
      </section>

      {/* Segunda seção, de cards */}
      <section className='flex flex-col md:flex-row w-full items-center md:justify-between gap-3 lg:gap-12'>
        <div className='bg-white flex px-6 py-4 gap-2 rounded-lg w-[300px] md:w-full md:h-[108px]lg:h-full'>
          <LuCalendarDays className='size-12 sm:size-14 text-[#6B4A2E] self-center'/>
          <div className='self-center'>
            <p className='text-3xl leading-9 sm:text-4xl pt-2 font-semibold'>10</p>
            <p className='text-sm leading-4 sm:text-base'>Consultas para hoje</p>
          </div>
        </div>      

        <div className='bg-white flex px-6 py-4 gap-2 rounded-lg w-[300px] md:w-full md:h-[108px] lg:h-full'>
          <LuSquareCheck className='size-12 sm:size-14 text-[#6B4A2E] self-center'/>
          <div className='self-center'>
            <p className='text-3xl leading-9 sm:text-4xl pt-2 font-semibold'>10</p>
            <p className='text-sm leading-4 sm:text-base'>Consultas concluídas</p>
          </div>
        </div>
        
        <div className='bg-white flex px-6 py-4 gap-2 rounded-lg w-[300px] md:w-full md:h-[108px] lg:h-full'>
          <LuUser className='size-12 sm:size-14 text-[#6B4A2E] self-center'/>
          <div className='self-center'>
            <p className='text-3xl leading-9 sm:text-4xl pt-2 font-semibold'>108</p>
            <p className='text-sm leading-4 sm:text-base'>Pacientes cadastrados</p>
          </div>
        </div>
      </section>

      {/* Terceira seção, de consultas de hoje */}
      <section className='flex flex-col md:w-full gap-2 py-8 items-center md:items-start xl:items-center'>
        <p className='text-xl text-center font-medium py-2'>Para Hoje</p>

        <div className='bg-white flex flex-col w-full md:flex-row p-5 rounded-lg gap-3 text-zinc-950'>

          <section className='bg-[#F1EDE3] rounded-lg p-4 w-[260px] md:w-[300px]'>
            <div className='flex justify-between items-center pb-2'>
              <p className='font-medium'>09:30 - 10:30</p>
              <button><HiDotsVertical/></button>
            </div>
            <div className='py-2'>
              <p className='text-lg leading-4 font-semibold'>Raissa Andrade</p>
              <p className=''>Sessão de fisioterapia</p>
            </div>
            <p className='px-3 py-1 justify-self-end bg-red-800 max-w-28 rounded-full text-sm text-white font-medium'>Cancelada</p>
          </section>

          <section className='bg-[#F1EDE3] rounded-lg p-4 w-[260px] md:w-[300px]'>
            <div className='flex justify-between items-center pb-2'>
              <p className='font-medium'>09:30 - 10:30</p>
              <button><HiDotsVertical/></button>
            </div>
            <div className='py-2'>
              <p className='text-lg leading-4 font-semibold'>Raissa Andrade</p>
              <p className=''>Sessão de fisioterapia</p>
            </div>
            <p className='px-3 py-1 justify-self-end bg-red-800 max-w-28 rounded-full text-sm text-white font-medium'>Cancelada</p>
          </section>

          <section className='bg-[#F1EDE3] rounded-lg p-4 w-[260px] md:w-[300px]'>
            <div className='flex justify-between items-center pb-2'>
              <p className='font-medium'>09:30 - 10:30</p>
              <button><HiDotsVertical/></button>
            </div>
            <div className='py-2'>
              <p className='text-lg leading-4 font-semibold'>Raissa Andrade</p>
              <p className=''>Sessão de fisioterapia</p>
            </div>
            <p className='px-3 py-1 justify-self-end bg-red-800 max-w-28 rounded-full text-sm text-white font-medium'>Cancelada</p>
          </section>
        </div>
      </section>
    </div>
  )
}