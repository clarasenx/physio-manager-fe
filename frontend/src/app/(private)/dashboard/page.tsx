import { LuCalendarDays, LuPin, LuSquareCheck, LuUser } from 'react-icons/lu';
import { DashboardResult } from './components/result';
import { TodayAppointments } from './components/todayAppointments';

export default async function Dashboard() {

  return (
    <div className='flex flex-col h-full w-full items-center px-4 sm:px-8 py-4 sm:py-5'>
      {/* Primeira seção, de boas vindas */}
      <section className='flex flex-col w-full items-center md:items-start  text-[#2D231C] pb-5'>
        <p className='text-3xl py-2'>
          Seja bem-vinda!
        </p>
        <p className='text-sm'>Vamos dar uma olhada no que temos para hoje</p>
      </section>

      {/* Segunda seção, de cards */}
      <section className='flex flex-col md:flex-row w-full items-center md:justify-between gap-3 lg:gap-12'>
        <div className='bg-white flex px-6 py-4 gap-2 rounded-lg w-full md:w-full md:h-[108px]lg:h-full shadow'>
          <LuCalendarDays className='size-12 sm:size-14 text-[#6B4A2E] self-center' />
          <div className='self-center'>

            <DashboardResult dataKey='todayAppointments' />
            <p className='text-sm leading-4 sm:text-base'>Consultas para hoje</p>
          </div>
        </div>

        <div className='bg-white flex px-6 py-4 gap-2 rounded-lg w-full md:w-full md:h-[108px] lg:h-full shadow'>
          <LuSquareCheck className='size-12 sm:size-14 text-[#6B4A2E] self-center' />
          <div className='self-center'>
            <DashboardResult dataKey='totalAppointmentsCompleted' />
            <p className='text-sm leading-4 sm:text-base'>Consultas concluídas este mês</p>
          </div>
        </div>

        <div className='bg-white flex px-6 py-4 gap-2 rounded-lg w-full md:w-full md:h-[108px] lg:h-full shadow'>
          <LuUser className='size-12 sm:size-14 text-[#6B4A2E] self-center' />
          <div className='self-center'>
            <DashboardResult dataKey='totalPatients' />
            <p className='text-sm leading-4 sm:text-base'>Pacientes cadastrados</p>
          </div>
        </div>
      </section>

      {/* Terceira seção, de consultas de hoje */}
      <section className='flex flex-col w-full md:h-full gap-2 mt-5 items-center md:items-start'>
        <p className='flex items-center gap-1 text-xl text-center font-medium py-2 md:hidden'><LuPin className='size-5' /> Para Hoje</p>
        <div className='hidden md:flex items-center w-full gap-2'>
          <LuPin className='size-6' />
          <p className='text-xl text-center font-medium py-2'>Compromissos para hoje</p>
        </div>

        <TodayAppointments />
      </section>
    </div>
  )
}