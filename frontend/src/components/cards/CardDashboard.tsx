'use client'
import { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

import { AppointmentType } from '@/dtos/appointment/appointment.schema';
import { StatusView } from '@/constants/StatusView';
import { isAppointmentStarted } from '@/utils/isAppointmentStarted';
import { AppointmentStatus } from '@/enum/appointment-status.enum';
import { AppointmentMenu } from '@/app/(private)/consultas/components/appointmentMenu';

interface DashboardDataProps {
  item: AppointmentType;
}

const CardDashboard = ({ item }: DashboardDataProps) => {
  const [menuAberto, setMenuAberto] = useState(false);
  return (
    <section className='bg-[#F6F5F2] flex flex-col rounded-lg p-4 md:px-5 md:flex-row w-full shadow'>
      <div className='flex justify-between items-center pb-2 md:pb-0  md:border-r-2 border-[#6B4A2E] md:justify-center lg:mr-10 md:h-16 md:w-1/5 lg:w-40'>
        <p className='text-nowrap font-medium md:text-lg lg:text-xl md:font-semibold md:leading-5'>{new Date(item.date).toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })}</p>
        <button className='md:hidden cursor-pointer' onClick={() => setMenuAberto(!menuAberto)}><HiDotsVertical /></button>
      </div>
      <div className='py-2 md:p-3 md:w-2/5 text-nowrap'>
        <p className='text-lg leading-5 font-semibold'>{item.patient?.name}</p>
        <p className='md:text-sm'>{item.appointmentType?.name || 'Indefinido'}</p>
      </div>
      <div className='relative flex justify-end md:justify-between gap-2 items-center md:w-2/5'>
        {
          isAppointmentStarted(item) ?
            <p
              className={`px-2 sm:px-3 py-1 justify-self-end font-medium rounded-full w-[133px] text-sm text-white text-center bg-green-800`}
            >Em Andamento</p> : <p className={`px-3 py-1 justify-self-end rounded-full text-sm text-white font-medium w-[133px] text-center 
              ${item.status === AppointmentStatus.COMPLETED ? "bg-green-800" : item.status === AppointmentStatus.SCHEDULED ? "bg-amber-600" : item.status === AppointmentStatus.CANCELED ? "bg-red-800" : ''}`}>{StatusView[item.status]}</p>
        }
        
        <button className='hidden md:flex bg-[#6A5242] text-white hover:cursor-pointer px-8 py-1 rounded-lg text-sm'
          onClick={() => setMenuAberto(!menuAberto)}>Editar</button>
        {menuAberto && (
          <AppointmentMenu
            menuAberto={menuAberto}
            setMenuAberto={setMenuAberto}
            className='top-[-84px] right-5 md:right-28 md:top-5 bg-[#F6F5F2]'
            appointment={item}
          />
        )}
      </div>
    </section>
  )
}

export default CardDashboard;