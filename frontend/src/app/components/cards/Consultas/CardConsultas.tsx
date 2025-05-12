import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiClock, HiDotsVertical } from 'react-icons/hi';
import { LuList } from 'react-icons/lu';
import { ScheduleMenu } from '../../scheduleMenu';


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
  item: Consulta;
}

export default function CardConsulta({ item }: CardConsultaProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <section className='bg-[#F1EDE3] justify-between w-full flex rounded-lg p-4 '>
      <div className='flex md:gap-8'>
        <div className='flex flex-col items-center justify-center pr-4 border-r-2 border-[#6B4A2E]/40 sm:pl-3 sm:pr-5 md:pl-8 md:pr-10 lg:justify-center '>
          <p className='font-semibold text-lg text-[#1f1005] md:font-semibold md:text-center'>{item.data.diaSemana}</p>
          <p className='font-bold text-4xl text-[#6A5242] md:text-center'>{item.data.diaMes}</p>
        </div>
        <div className='flex flex-col px-2'>
          <div className='flex items-center gap-2'>
            <LuList className='text-[#6A5242]' />
            <p className='line-clamp-1'>{item.tratamento}</p>
          </div>
          <div className='flex items-center gap-2'>
            <HiClock className='text-[#6A5242]' />
            <p className='line-clamp-1'>{item.horário}</p>
          </div>
          <div className='flex items-center gap-2'>
            <FaUser className='text-[#6A5242]' />
            <p className='line-clamp-1'>{item.paciente}</p>
          </div>
        </div>
      </div>

      <div className='relative flex flex-col md:justify-center'>
        <button className='md:hidden' onClick={() => setMenuAberto(!menuAberto)}><HiDotsVertical /></button>
        <button className='hidden md:flex bg-[#6A5242] text-white hover:cursor-pointer px-8 py-1 rounded-lg text-sm' onClick={() => setMenuAberto(!menuAberto)}>Editar</button>
        {menuAberto && (
          <ScheduleMenu
            menuAberto={menuAberto}
            setMenuAberto={setMenuAberto}
            className='top-1 right-5 md:right-26 md:top-5 bg-[#F1EDE3]'
          />
        )}
      </div>
    </section>
  )
}