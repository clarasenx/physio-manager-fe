'use client'
import { useState } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { Button } from "@/components/ui/button"
import { AppointmentStatus } from '@/enum/appointment-status.enum';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ConsultaCreateDialog } from './components/createDialog';
import { ListAppointmentType } from '@/dtos/appointment/list-appointment.dto';
import { useAppointment } from '@/hooks/useAppointment';
import { groupAppointmentsByDate, groupAppointmentsByMonth } from '@/utils/appointmentUtils';
import { Scheduler } from '@/components/scheduler';
import { AppointmentSection } from './components/appointmentSection';
import { AppointmentType } from '@/dtos/appointment/appointment.schema';


export default function Consultas() {

  const [activeToggleInicial, setActiveToggleInicial] = useState(1);
  const toggleInicial = [
    { id: 1, label: "Consultas" },
    { id: 2, label: "Calendário" },
  ]

  const [activeToggleConsultas, setActiveToggleConsultas] = useState(1);
  const toggleConsultas = [
    { id: 1, label: "Agendadas", status: AppointmentStatus.SCHEDULED },
    { id: 2, label: "Concluídas", status: AppointmentStatus.COMPLETED },
    { id: 3, label: "Canceladas", status: AppointmentStatus.CANCELED },
  ]

  const appointmentStatus = toggleConsultas.find(t => t.id === activeToggleConsultas)?.status

  const appointments = useAppointment({ status: appointmentStatus })

  function Loading() {
    return (
      <div className='lex flex-col gap-3 py-4 px-3 md:px-6 w-full'>
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
      </div>
    )
  }


  return (
    <div className='w-full max-h-dvh px-4 sm:px-8'>
      {/* toggle Consultas/Calendario */}
      <section className='flex justify-center px-4 mt-2 sm:mt-6'>
        <div className="relative inline-flex bg-white rounded-full p-1">
          {/* Indicador deslizante */}
          <div
            className="absolute top-1 left-1 h-7 w-24 rounded-full bg-[#6B4A2E] transition-all duration-300"
            style={{
              transform: `translateX(${(activeToggleInicial - 1) * 95}px)`
            }}
          ></div>

          {toggleInicial.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveToggleInicial(item.id)}
              className={`relative z-10 w-24 h-7 text-sm flex items-center justify-center rounded-full transition-all duration-300 font-medium ${activeToggleInicial === item.id ? 'text-white' : 'text-[#2D231C]'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* Seção consultas */}
      <section className='flex flex-col gap-2 sm:gap-4 my-3 sm:my-6 '>
        <div className='flex justify-between w-full items-center'>
          <h2 className='text-2xl text-center md:text-start font-medium'>Consultas</h2>
          {
            activeToggleInicial === 1 ?
              <div className='sm:hidden'>
                <ConsultaCreateDialog>
                  <Button><LuCirclePlus />Nova Consulta</Button>
                </ConsultaCreateDialog>
              </div>
              : <></>
          }
        </div>


        <div className='bg-white w-full h-full rounded-lg py-3 sm:py-5 px-2 sm:px-4 shadow'>

          {
            activeToggleInicial === 1 ? (
              <>
                <div className='relative sm:w-full items-center gap-3 flex flex-col sm:flex-row sm:px-6 sm:justify-between'>
                  {/* toggle consultas agendadas/concluidas/canceladas */}
                  <div className="relative inline-flex bg-[#F7F3EB] rounded-full p-1">
                    {/* Indicador deslizante */}
                    <div
                      className="absolute top-1 left-1 h-7 w-24 rounded-full bg-[#6B4A2E] transition-all duration-300"
                      style={{
                        transform: `translateX(${(activeToggleConsultas - 1) * 96}px)`
                      }}
                    ></div>

                    {toggleConsultas.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveToggleConsultas(item.id)}
                        className={`relative z-10 w-24 h-7 text-[12px] flex items-center justify-center rounded-full transition-all duration-300 font-medium ${activeToggleConsultas === item.id ? 'text-white' : 'text-[#2D231C]'
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className='hidden sm:block'>
                    <ConsultaCreateDialog>
                      <Button><LuCirclePlus />Nova Consulta</Button>
                    </ConsultaCreateDialog>
                  </div>
                </div>

                <div className='w-full max-h-[63dvh] md:max-h-[73dvh] my-2 overflow-auto'>

                  {/*Seção das consultas do dia*/}
                  {
                    appointments.isLoading ? <Loading /> :
                      appointments.isError ? <ErrorMessage name='consultas' refetch={appointments.refetch} isLoading={appointments.isFetching} /> :
                        activeToggleConsultas === 1 ?
                          <ConsultasAgendadas appointments={appointments.data} /> :
                          <ConsultasConcluidasECanceladas appointments={appointments.data?.data || []} status={activeToggleConsultas === 2 ? 'concluída' : 'cancelada'} />
                  }
                </div>

              </>) : (
              <div className='sm:px-6 w-full'>
                <Scheduler />
              </div>
            )
          }

        </div>
      </section>
    </div>
  )
}

function ConsultasAgendadas({ appointments }: { appointments?: ListAppointmentType }) {
  const grouped = groupAppointmentsByDate(appointments?.data || [])
  return (
    <>
      <AppointmentSection title="Para hoje" items={grouped.today} />
      <AppointmentSection title="Para esta semana" items={grouped.thisWeek} />
      <AppointmentSection title="Para este mês" items={grouped.thisMonth} />
      {
        Object.entries(grouped.months).map(([month, items]) => (
          <AppointmentSection key={month} title={`Para ${month}`} items={items} />
        ))
      }
    </>
  )
}

function ConsultasConcluidasECanceladas({ appointments, status }: { appointments: AppointmentType[], status: string }) {
  const grouped = groupAppointmentsByMonth(appointments)

  const sortedEntries = Object.entries(grouped.months).sort((a, b) => {
    const dateA = new Date(a[1][0].date).getTime()
    const dateB = new Date(b[1][0].date).getTime()
    return dateB - dateA // Mais recente primeiro
  })

  return (
    <>
      {
        !sortedEntries.length ? <p className='py-2 sm:py-4 px-3 md:px-6'>Não há Nenhuma consulta {status}</p>
          :
          sortedEntries.map(([month, items]) => (
            <AppointmentSection key={month} title={`${month}`} items={items} />
          ))}
    </>
  )
}