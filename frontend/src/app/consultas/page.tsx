'use client'
import { useState } from 'react';
import { Scheduler } from '@/components/scheduler';
import { LuCirclePlus } from 'react-icons/lu';
import { Button } from "@/components/ui/button"
import { useSchedule } from '@/hooks/useSchedule';
import { ScheduleStatus } from '@/enum/schedule-status.enum';
import { Skeleton } from '@/components/ui/skeleton';
import { ScheduleSection } from './components/scheduleSection';
import { groupSchedulesByDate, groupSchedulesByMonth } from '@/utils/scheduleUtils';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ConsultaCreateDialog } from './components/createDialog';
import { ListScheduleType } from '@/dtos/schedule/list-schedule.dto';


export default function Consultas() {

  const [activeToggleInicial, setActiveToggleInicial] = useState(1);
  const toggleInicial = [
    { id: 1, label: "Consultas" },
    { id: 2, label: "Calendário" },
  ]

  const [activeToggleConsultas, setActiveToggleConsultas] = useState(1);
  const toggleConsultas = [
    { id: 1, label: "Agendadas", status: ScheduleStatus.SCHEDULED },
    { id: 2, label: "Concluídas", status: ScheduleStatus.COMPLETED },
    { id: 3, label: "Canceladas", status: ScheduleStatus.CANCELED },
  ]

  const scheduleStatus = toggleConsultas.find(t => t.id === activeToggleConsultas)?.status

  const schedules = useSchedule({ status: scheduleStatus })

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
    <div className='w-full max-h-dvh'>
      {/* toggle Consultas/Calendario */}
      <section className='flex justify-center px-4 mt-3 sm:mt-6'>
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
      <section className='flex flex-col gap-4 px-7 md:pl-4 md:pr-7 py-4 '>
        <h2 className='text-2xl text-center md:text-start font-medium'>Consultas</h2>


        <div className='bg-white w-full rounded-2xl py-2 flex flex-col items-center justify-center'>

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
                  <ConsultaCreateDialog>
                    <Button><LuCirclePlus />Nova Consulta</Button>
                  </ConsultaCreateDialog>
                </div>

                <div className='w-full max-h-[63dvh] md:max-h-[75dvh] my-2 overflow-auto'>

                  {/* arrumar um jeito de exibir consultas especificas po dia e por status */}
                  {/*Seção das consultas do dia*/}
                  {
                    schedules.isPending ? <Loading /> :
                      schedules.isError ? <ErrorMessage refetch={schedules.refetch} isLoading={schedules.isFetching} /> :
                        activeToggleConsultas === 1 ?
                          <ConsultasAgendadas schedules={schedules.data} /> :
                          <ConsultasConcluidasECanceladas schedules={schedules.data} />
                  }
                </div>

              </>) : (
              <div className='px-6 w-full'>
                <Scheduler />
              </div>
            )
          }

        </div>
      </section>
    </div>
  )
}

function ConsultasAgendadas({ schedules }: { schedules?: ListScheduleType[] }) {
  const grouped = groupSchedulesByDate(schedules || [])
  return (
    <>
      <ScheduleSection title="Para hoje" items={grouped.today} />
      <ScheduleSection title="Para esta semana" items={grouped.thisWeek} />
      <ScheduleSection title="Para este mês" items={grouped.thisMonth} />
      {
        Object.entries(grouped.months).map(([month, items]) => (
          <ScheduleSection key={month} title={`Para ${month}`} items={items} />
        ))
      }
    </>
  )
}

function ConsultasConcluidasECanceladas({ schedules }: { schedules?: ListScheduleType[] }) {
  const grouped = groupSchedulesByMonth(schedules || [])

  const sortedEntries = Object.entries(grouped.months).sort((a, b) => {
    const dateA = new Date(a[1][0].date).getTime()
    const dateB = new Date(b[1][0].date).getTime()
    return dateB - dateA // Mais recente primeiro
  })

  return (
    <>
      {sortedEntries.map(([month, items]) => (
        <ScheduleSection key={month} title={`${month}`} items={items} />
      ))}
    </>
  )
}