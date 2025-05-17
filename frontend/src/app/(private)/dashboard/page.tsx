import { LuCalendarDays, LuPin, LuSquareCheck, LuUser } from 'react-icons/lu';
import { DashboardResult } from './components/result';
import { TodaySchedules } from './components/todaySchedules';

export default function Dashboard() {

  return (
    <div className='flex flex-col h-full w-full items-center px-2 sm:px-8 sm:py-5'>
      {/* Primeira seção, de boas vindas */}
      <section className='flex flex-col w-full items-center md:items-start  text-[#2D231C] pb-5'>
        <p className='text-3xl py-2'>
          Seja bem-vindo (a)!
        </p>
        <p className='text-sm'>Vamos dar uma olhada no que temos para hoje</p>
      </section>

      {/* Segunda seção, de cards */}
      <section className='flex flex-col md:flex-row w-full items-center md:justify-between gap-3 lg:gap-12'>
        <div className='bg-white flex px-6 py-4 gap-2 rounded-lg w-full md:w-full md:h-[108px]lg:h-full'>
          <LuCalendarDays className='size-12 sm:size-14 text-[#6B4A2E] self-center' />
          <div className='self-center'>

            <DashboardResult dataKey='todaySchedules' />
            <p className='text-sm leading-4 sm:text-base'>Consultas para hoje</p>
          </div>
        </div>

        <div className='bg-white flex px-6 py-4 gap-2 rounded-lg w-full md:w-full md:h-[108px] lg:h-full'>
          <LuSquareCheck className='size-12 sm:size-14 text-[#6B4A2E] self-center' />
          <div className='self-center'>
            <DashboardResult dataKey='totalSchedulesCompleted' />
            <p className='text-sm leading-4 sm:text-base'>Consultas concluídas</p>
          </div>
        </div>

        <div className='bg-white flex px-6 py-4 gap-2 rounded-lg w-full md:w-full md:h-[108px] lg:h-full'>
          <LuUser className='size-12 sm:size-14 text-[#6B4A2E] self-center' />
          <div className='self-center'>
            <DashboardResult dataKey='totalPatients' />
            <p className='text-sm leading-4 sm:text-base'>Pacientes cadastrados</p>
          </div>
        </div>
      </section>

      {/* Terceira seção, de consultas de hoje */}
      <section className='flex flex-col w-full md:h-full gap-2 py-8 items-center md:items-start'>
        <p className='text-xl text-center font-medium py-2 md:hidden'>Para Hoje</p>
        <div className='hidden md:flex items-center w-full gap-2'>
          <LuPin className='size-6' />
          <p className='text-xl text-center font-medium py-2'>Compromissos para hoje</p>
        </div>

        <TodaySchedules />
      </section>
    </div>
  )
}