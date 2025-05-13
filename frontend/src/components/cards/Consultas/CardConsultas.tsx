import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiClock, HiDotsVertical } from 'react-icons/hi';
import { LuList } from 'react-icons/lu';
import { ScheduleMenu } from '../../scheduleMenu';
import { ScheduleType } from '@/dtos/schedule/schedule.schema';


interface ConsultaData {
  diaSemana: string;
  diaMes: string;
}

interface Consulta {
  id: number;
  data: ConsultaData;
  tratamento: string;
  horário: string;
  paciente: string;
}

interface CardConsultaProps {
  item: ScheduleType;
}

export default function CardConsulta({ item }: CardConsultaProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  const getWeekDay = (date: Date)=> {
    const aux = new Date(date)
    return aux.toLocaleDateString('pt-BR', { weekday: 'short' })
  }

  const getMonthDay = (date: Date)=> {
    const aux = new Date(date)
    return aux.getDate()
  }

  const getTime = (date: Date)=> {
    const aux = new Date(date)
    return aux.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <section className='bg-[#F6F5F2] justify-between w-full flex rounded-lg p-4 '>
      <div className='flex md:gap-8'>
        <div className='flex flex-col items-center justify-center pr-4 border-r-2 border-[#6B4A2E]/40 sm:pl-3 sm:pr-5 md:pl-8 md:pr-10 lg:justify-center '>
          <p className='font-semibold text-lg text-[#1f1005] md:font-semibold md:text-center'>{getWeekDay(item.date)}</p>
          <p className='font-bold text-4xl text-[#6A5242] md:text-center'>{getMonthDay(item.date)}</p>
        </div>
        <div className='flex flex-col px-2'>
          <div className='flex items-center gap-2'>
            <LuList className='text-[#6A5242]' />
            <p className='line-clamp-1'>{item.patient?.name}</p>
          </div>
          <div className='flex items-center gap-2'>
            <HiClock className='text-[#6A5242]' />
            <p className='line-clamp-1'>{getTime(item.date)}</p>
          </div>
          <div className='flex items-center gap-2'>
            <FaUser className='text-[#6A5242]' />
            <p className='line-clamp-1'>{item.patient?.name}</p>
          </div>
        </div>
      </div>

      <div className='relative flex flex-col md:justify-center'>
        <button className='cursor-pointer' onClick={() => setMenuAberto(!menuAberto)}><HiDotsVertical color='#6A5242' size={28}/></button>
        {/* <button className='hidden md:flex bg-[#6A5242] text-white hover:cursor-pointer px-8 py-1 rounded-lg text-sm' onClick={() => setMenuAberto(!menuAberto)}>Editar</button> */}
        {menuAberto && (
          <ScheduleMenu
            menuAberto={menuAberto}
            setMenuAberto={setMenuAberto}
            className='top-1 right-8 md:top-5 bg-[#F6F5F2]'
          />
        )}
      </div>
    </section>
  )
}