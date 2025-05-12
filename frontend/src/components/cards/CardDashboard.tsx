'use cliente'
import { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { ScheduleMenu } from '../scheduleMenu';

interface DashboardData {
  id: number;
  name: string;
  treatment: string;
  time: string;
  status: string;
}

interface DashboardDataProps {
  item: DashboardData;
}

const CardDashboard = ({item}: DashboardDataProps) => {
  const [menuAberto, setMenuAberto] = useState(false);
  return (
    <section className='bg-[#F1EDE3] flex flex-col rounded-lg p-4 md:px-5 md:flex-row w-full'>
      <div className='flex justify-between items-center pb-2 md:pb-0  md:border-r-2 border-[#6B4A2E] lg:justify-center lg:mr-10 md:h-16 md:w-1/5'>
        <p className='text-nowrap font-medium md:text-lg lg:text-xl md:font-semibold md:leading-5'>{item.time}</p>
        <button className='md:hidden cursor-pointer'><HiDotsVertical/></button>
      </div>
      <div className='py-2 md:p-3 md:w-2/5 text-nowrap'>
        <p className='text-lg leading-5 font-semibold'>{item.name}</p>
        <p className='md:text-sm'>{item.treatment}</p>
      </div>
      <div className='relative md:flex md:justify-between md:items-center md:w-2/5'>
        <p className={`px-3 py-1 justify-self-end max-w-28 rounded-full text-sm text-white font-medium w-[120px] text-center ${item.status === "Concluída" ? "bg-green-800" : item.status === "Pendente" ? "bg-amber-600" : item.status === "Cancelada" ? "bg-red-800" : ''}`}>{item.status}</p>
        <button className='hidden md:flex bg-[#6A5242] text-white hover:cursor-pointer px-8 py-1 rounded-lg text-sm'
        onClick={() => setMenuAberto(!menuAberto)}>Editar</button>
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

export default CardDashboard;