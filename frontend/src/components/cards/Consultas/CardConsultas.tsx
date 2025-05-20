import { useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiClock, HiDotsVertical } from 'react-icons/hi';
import { ListAppointmentType } from '@/dtos/appointment/list-appointment.dto';
import { isAppointmentStarted } from '@/utils/isAppointmentStarted';
import { AppointmentMenu } from '@/app/(private)/consultas/components/appointmentMenu';
import { Portal } from '@/components/portal';


interface CardConsultaProps {
  item: ListAppointmentType;
}

export default function CardConsulta({ item }: CardConsultaProps) {
  const [ menuAberto, setMenuAberto ] = useState(false);

  const ref = useRef<HTMLButtonElement>(null);
  const [ menuPosition, setMenuPosition ] = useState({ top: 0, left: 0 });

  const toggleActions = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setMenuPosition({ top: rect.top - (rect.height/3), left: rect.left + (rect.width) });
    }
    setMenuAberto(!menuAberto);
  };

  const getWeekDay = (date: Date) => {
    const aux = new Date(date)
    return aux.toLocaleDateString('pt-BR', { weekday: 'short' })
  }

  const getMonthDay = (date: Date) => {
    const aux = new Date(date)
    return aux.getDate()
  }

  const getTime = (date: Date) => {
    const aux = new Date(date)
    return aux.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <section className='bg-[#F6F5F2] justify-between w-full flex rounded-lg py-2 sm:py-3 px-4 shadow'>
      <div className='flex md:gap-8'>
        <div className='flex flex-col items-center justify-center pr-4 border-r-2 border-[#6B4A2E]/40 sm:pl-3 sm:pr-5 md:pl-8 md:pr-10 lg:justify-center w-20 sm:w-32'>
          <p className='font-semibold text-lg text-[#1f1005] md:font-semibold md:text-center'>{getWeekDay(item.date)}</p>
          <p className='font-bold text-3xl sm:text-4xl text-[#6A5242] md:text-center'>{getMonthDay(item.date)}</p>
        </div>
        <div className='grid sm:grid-cols-2'>
          <div className='flex items-center px-2 sm:col-start-2 row-start-1'>
            <p className='line-clamp-1 font-medium px-0.5'>{item.appointmentType?.name}</p>
          </div>
          <div className='flex flex-col justify-between px-2  sm:py-2 sm:w-60 col-start-1 '>
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
      </div>

      <div className='flex items-start gap-2 sm:gap-6'>
        {
          isAppointmentStarted(item) ?
            <p
              className={`px-1 sm:px-3 py-1 sm:py-1 justify-self-end font-medium rounded-full text-xs text-green-800 sm:text-sm sm:text-white text-center sm:bg-green-800`}
            >Em Andamento</p> : <></>
        }
        <div className='relative flex flex-col md:justify-center'>
          <button className='cursor-pointer' ref={ref} onClick={toggleActions}><HiDotsVertical color='#6A5242' size={28} /></button>
          {/* <button className='hidden md:flex bg-[#6A5242] text-white hover:cursor-pointer px-8 py-1 rounded-lg text-sm' onClick={() => setMenuAberto(!menuAberto)}>Editar</button> */}
          {menuAberto && (
            <Portal>
              <div style={{ position: 'absolute', top: menuPosition.top, left: menuPosition.left, zIndex: 10 }}>
                <AppointmentMenu
                  menuAberto={menuAberto}
                  setMenuAberto={setMenuAberto}
                  className='top-1 right-8 md:top-5 bg-[#F6F5F2]'
                  appointment={item}
                />
              </div>
            </Portal>
          )}
        </div>
      </div>
    </section>
  )
}