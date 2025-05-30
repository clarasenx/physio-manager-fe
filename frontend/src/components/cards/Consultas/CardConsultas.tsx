import { useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiClock, HiDotsVertical } from 'react-icons/hi';
import { isAppointmentStarted } from '@/utils/isAppointmentStarted';
import { AppointmentMenu } from '@/app/(private)/consultas/components/appointmentMenu';
import { Portal } from '@/components/portal';
import { AppointmentType } from '@/dtos/appointment/appointment.schema';
import { StatusView } from '@/constants/StatusView';
import { AppointmentStatus } from '@/enum/appointment-status.enum';


interface CardConsultaProps {
  item: AppointmentType;
  showStatus?: boolean
}

export default function CardConsulta({ item, showStatus }: CardConsultaProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  const ref = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleActions = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setMenuPosition({ top: rect.top - (rect.height / 3), left: rect.left + (rect.width) });
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
        <div className='flex flex-col items-center justify-center pr-2 border-r-2 border-[#6B4A2E]/40 sm:pl-3 sm:pr-5 md:pl-8 md:pr-10 lg:justify-center w-12 sm:w-32'>
          <p className='font-semibold text-lg text-[#1f1005] md:font-semibold md:text-center'>{getWeekDay(item.date)}</p>
          <p className='font-bold text-3xl sm:text-4xl text-[#6A5242] md:text-center'>{getMonthDay(item.date)}</p>
        </div>
        <div className='grid sm:grid-cols-2'>
          <div className='flex items-center px-2 sm:col-start-2 row-start-1'>
            <p className='line-clamp-1 font-medium px-0.5 max-w-[165px] sm:max-w-none text-ellipsis overflow-hidden'>{item.appointmentType?.name || 'Tratamento Indefinido'}</p>
          </div>
          <div className='flex flex-col justify-between px-2  sm:py-2 sm:w-60 col-start-1 '>
            <div className='flex items-center gap-2'>
              <HiClock className='text-[#6A5242]' />
              <p className='line-clamp-1 '>{getTime(item.date)}</p>
            </div>
            <div className='flex items-center gap-2'>
              <FaUser className='text-[#6A5242]' />
              <p className='line-clamp-1 text-ellipsis max-w-[150px] lg:max-w-[150px]  xl:max-w-none overflow-hidden'>{item.patient?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col relative items-end justify-between gap-2 sm:w-30 sm:gap-6'>
        <div className='absolute right-[-10px] sm:right-0 flex flex-col md:justify-center'>
          <button className='cursor-pointer' ref={ref} onClick={toggleActions}><HiDotsVertical color='#6A5242' size={28} /></button>
          {/* <button className='hidden md:flex bg-[#6A5242] text-white hover:cursor-pointer px-8 py-1 rounded-lg text-sm' onClick={() => setMenuAberto(!menuAberto)}>Editar</button> */}
          {menuAberto && (
            <Portal>
              <div style={{ position: 'absolute', top: menuPosition.top, left: menuPosition.left, zIndex: 10 }}>
                <AppointmentMenu
                  menuAberto={menuAberto}
                  setMenuAberto={setMenuAberto}
                  className='top-[-20px] right-5 md:top-5 bg-[#F6F5F2]'
                  appointment={item}
                />
              </div>
            </Portal>
          )}
        </div>
        <div className='absolute bottom-1 bottom-[-10px] right-[-10px] w-30 md:w-50 md:right-8 lg:right-[50px] md:bottom-11'>
          {
            isAppointmentStarted(item) ?
              <p
                className={`line-clamp-1 px-1 md:px-3 py-1 md:py-1 justify-self-end font-medium rounded-full text-xs text-green-800 md:text-sm md:text-white text-end md:text-center md:bg-green-800`}
              >Em Andamento</p> :
              showStatus ?
                <p className={`px-1 md:px-3 py-1 md:py-1 self-end font-medium rounded-full text-xs md:text-sm text-end lg:text-center 
                        ${item.status === AppointmentStatus.COMPLETED ? "text-green-800" : item.status === AppointmentStatus.SCHEDULED ? "text-amber-600" : item.status === AppointmentStatus.CANCELED ? "text-red-800" : ''}`}>{StatusView[item.status]}</p> : <></>
          }
        </div>
      </div>
    </section>
  )
}