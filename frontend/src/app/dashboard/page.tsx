'use client'
import { HiDotsVertical } from 'react-icons/hi';
import { LuCalendarDays, LuPin, LuSquareCheck, LuUser } from 'react-icons/lu';

export default function Dashboard() {

  return (
    <div className='flex flex-col h-full w-full items-center px-8 sm:py-5'>
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
      <section className='flex flex-col md:w-full md:h-full gap-2 py-8 items-center md:items-start'>
        <p className='text-xl text-center font-medium py-2 md:hidden'>Para Hoje</p>
        <div className='hidden md:flex items-center w-full gap-2'>
          <LuPin  className='size-6'/> 
          <p className='text-xl text-center font-medium py-2'>Compromissos para hoje</p>
        </div>

        <div className='bg-white flex flex-col w-full md:h-full p-5 rounded-lg gap-3 text-zinc-950'>
          {/* ### transformar esse card em componente ### */}
          <section className='bg-[#F1EDE3] flex flex-col rounded-lg p-4 md:px-5 w-[260px] md:flex-row md:w-full'>
            <div className='flex justify-between items-center pb-2 md:pb-0 md:h-full md:border-r-2 border-[#6B4A2E] lg:justify-center md:pr-4 md:mr-6 lg:mr-10 md:w-1/7'>
              <p className='font-medium md:text-lg lg:text-xl md:font-semibold md:text-center'>09:30 <br className='hidden md:flex xl:hidden'/> - <br className='hidden md:flex xl:hidden'/>  10:30</p>
              <button className='md:hidden'><HiDotsVertical/></button>
            </div>
            <div className='py-2 md:p-4 md:w-3/7'>
              <p className='text-lg leading-4 font-semibold'>Raissa Andrade</p>
              <p className='md:text-sm'>Sessão de fisioterapia</p>
            </div>
            <div className='md:flex md:justify-between md:items-center md:w-3/7'>
              <p className='px-3 py-1 justify-self-end bg-red-800 max-w-28 rounded-full text-sm text-white font-medium w-[120px] text-center'>Cancelada</p>
              <button className='hidden md:flex bg-[#6A5242] text-white hover:cursor-pointer px-8 py-1 rounded-lg text-sm'>Editar</button>
            </div>
          </section>

          <section className='bg-[#F1EDE3] flex flex-col rounded-lg p-4 md:px-5 w-[260px] md:flex-row md:w-full'>
            <div className='flex justify-between items-center pb-2 md:pb-0 md:h-full md:border-r-2 border-[#6B4A2E] lg:justify-center md:pr-4 md:mr-6 lg:mr-10 md:w-1/7'>
              <p className='font-medium md:text-lg lg:text-xl md:font-semibold md:text-center'>09:30 <br className='hidden md:flex xl:hidden'/> - <br className='hidden md:flex xl:hidden'/>  10:30</p>
              <button className='md:hidden'><HiDotsVertical/></button>
            </div>
            <div className='py-2 md:p-4 md:w-3/7'>
              <p className='text-lg leading-4 font-semibold'>Raissa Andrade</p>
              <p className='md:text-sm'>Sessão de fisioterapia</p>
            </div>
            <div className='md:flex md:justify-between md:items-center md:w-3/7'>
              <p className='px-3 py-1 justify-self-end bg-green-900 max-w-28 rounded-full text-sm text-white font-medium w-[120px] text-center'>Concluída</p>
              <button className='hidden md:flex bg-[#6A5242] text-white hover:cursor-pointer px-8 py-1 rounded-lg text-sm'>Editar</button>
            </div>
          </section>

          <section className='bg-[#F1EDE3] flex flex-col rounded-lg p-4 md:px-5 w-[260px] md:flex-row md:w-full'>
            <div className='flex justify-between items-center pb-2 md:pb-0 md:h-full md:border-r-2 border-[#6B4A2E] lg:justify-center md:pr-4 md:mr-6 lg:mr-10 md:w-1/7'>
              <p className='font-medium md:text-lg lg:text-xl md:font-semibold md:text-center'>09:30 <br className='hidden md:flex xl:hidden'/> - <br className='hidden md:flex xl:hidden'/>  10:30</p>
              <button className='md:hidden'><HiDotsVertical/></button>
            </div>
            <div className='py-2 md:p-4 md:w-3/7'>
              <p className='text-lg leading-4 font-semibold'>Raissa Andrade</p>
              <p className='md:text-sm'>Sessão de fisioterapia</p>
            </div>
            <div className='md:flex md:justify-between md:items-center md:w-3/7'>
              <p className='px-3 py-1 justify-self-end bg-amber-600 max-w-28 rounded-full text-sm text-white font-medium w-[120px] text-center'>Pendente</p>
              <button className='hidden md:flex bg-[#6A5242] text-white hover:cursor-pointer px-8 py-1 rounded-lg text-sm'>Editar</button>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}