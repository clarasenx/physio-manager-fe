'use client'
import { useCallback, useState } from 'react';
import CardConsulta from '@/components/cards/Consultas/CardConsultas';
import { Scheduler } from '@/components/scheduler';
import { LuCirclePlus } from 'react-icons/lu';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ConsutasCreateForm } from './components/createForm';
import { useSchedule } from '@/hooks/useSchedule';
import { ScheduleStatus } from '@/enum/schedule-status.enum';
import { Skeleton } from '@/components/ui/skeleton';
import { isSameDay } from 'date-fns';
import { ScheduleSection } from './components/scheduleSection';


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

  const consultas = [
    { id: 1, tratamento: "Liberação miofascials gsg", horário: "09:30 - 10:30", paciente: "Andressa Andrade", data: { diaMes: "20", diaSemana: "Seg" }, status: "concluida" },
    { id: 2, tratamento: "Liberação miofascial", horário: "11:30 - 12:30", paciente: "Ana Andrade", data: { diaMes: "20", diaSemana: "Seg" }, status: "concluida" },
    { id: 3, tratamento: "Liberação miofascial", horário: "14:30 - 15:30", paciente: "Ana Frotasgsgsg ggsgsgs", data: { diaMes: "20", diaSemana: "Seg" }, status: "concluida" },
    { id: 4, tratamento: "Liberação miofascial", horário: "11:30 - 12:30", paciente: "Ana Andrade", data: { diaMes: "20", diaSemana: "Seg" }, status: "concluida" },
    { id: 5, tratamento: "Liberação miofascial", horário: "14:30 - 15:30", paciente: "Ana Frotasgsgsg ggsgsgs", data: { diaMes: "20", diaSemana: "Seg" }, status: "concluida" }
  ]
  const [activeCreateConsultaButton, setActiveCreateConsultaButton] = useState(false)

  const getScheduleToday = useCallback(() => schedules.data?.filter(schedule => isSameDay(schedule.date, new Date())), [schedules])

  const getSchedule = useCallback(() => schedules.data?.filter(schedule => !isSameDay(schedule.date, new Date())), [schedules])

  function Loading() {
    return (
      <>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[120px] h-[20px] rounded-full" />
        <Skeleton className="w-[110px] h-[20px] rounded-full" />
      </>
    )
  }

  function Error() {
    return (
      <>
        <h3 className='text-2xl text-center font-medium'>Ocorreu um erro ao carregar consultas</h3>
        <p>Tente novamente mais tarde!</p>
        <Button onClick={() => schedules.refetch()}>Recarregar</Button>
      </>
    )
  }

  return (
    <div className='w-full'>
      {/* toggle Consultas/Calendario */}
      <section className='flex justify-center px-4 mt-6'>
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
        <h2 className='text-2xl text-center font-medium'>Consultas</h2>

        <div className='bg-white w-full rounded-2xl py-4 flex flex-col items-center justify-center'>

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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button><LuCirclePlus />Nova Consulta</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
                      <DialogHeader>
                        <DialogTitle>Criar consulta</DialogTitle>
                      </DialogHeader>

                      <DialogFooter>
                        <ConsutasCreateForm />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>


                {/* arrumar um jeito de exibir consultas especificas po dia e por status */}
                {/*Seção das consultas do dia*/}
                {
                  schedules.isPending ? <Loading /> :
                    schedules.isError ? <Error /> : (
                      <>
                        <ScheduleSection title="Para hoje" items={getScheduleToday() || []} />
                        <ScheduleSection title="Para esta semana" items={getSchedule() || []} />
                      </>
                    )
                }
                
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