'use client'

import { getDaysInMonth } from "@/utils/getDaysInMonth";
import { useCallback, useState } from "react";
import { CalendarDay, EventType } from "./calendarDay";
import { isSameDay } from "@/utils/isSameDay";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSchedule } from "@/hooks/useSchedule";
import { StatusView } from "@/constants/StatusView";
import { StatusColor } from "@/constants/StatusColor";
import { SchedulerMobile } from "./mobile";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const weekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export const Scheduler = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const schedule = useSchedule()

  const [events, setEvents] = useState<EventType[]>([
    {
      date: new Date(),
      id: '1',
      time: '23 h',
      title: 'teste'
    }
  ]);

  const mounth = useCallback(() => currentMonth.toLocaleDateString('pt-BR', {
    month: 'long',
  }), [currentMonth])

  const days = useCallback(() => getDaysInMonth(currentMonth), [currentMonth])  // Função utilitária

  const nextMonth = () => setCurrentMonth(current => {
    const aux = new Date(current)
    aux.setMonth(current.getMonth() + 1)
    return aux
  })

  const previousMonth = () => setCurrentMonth(current => {
    const aux = new Date(current)
    aux.setMonth(current.getMonth() - 1)
    return aux
  })

  return (
    <>
      <div className="flex justify-between my-2">
        <div className="flex jusitfy-between items-center gap-2">
          <IoIosArrowBack size={18} className="cursor-pointer" onClick={previousMonth} />
          <h2 className="font-bold text-xl">{capitalize(mounth())}</h2>
          <IoIosArrowForward size={18} className="cursor-pointer" onClick={nextMonth} />
        </div>
        <span className="flex items-center mr-2 font-medium">{currentMonth.toLocaleDateString('pt-br', { year: 'numeric' })}</span>
      </div>
      <div className="hidden lg:block">
        <div className="grid grid-cols-7  grid-rows-1 gap-[1px] rounded-t-xl bg-[#D4D0C6] border-b border-[#D4D0C6] overflow-hidden w-full">
          {weekDays.map((day, index) => (
            <p key={`WeekDay-${index}`} className="text-center font-medium bg-[#F6F5F2] h-full py-2 text-[#6A5242]">{day}</p>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 gap-[1px] w-full bg-[#D4D0C6] rounded-b-xl overflow-hidden">
          {
            !schedule.isPending && !schedule.isError ?
              days().map((date, index) => (
                <CalendarDay
                  key={`CalendarDay-${index}`}
                  date={date.date}
                  isCurrentMonth={date.isCurrentMonth}
                  events={schedule.data?.filter(e => isSameDay(e.date, date.date)) || []}
                  index={index}
                />
              )) : <></>
          }
        </div>
        <div className="flex justify-center gap-5 mt-2">
          {
            Object.keys(StatusView).map((status, index) =>
              <div key={`legendStatusColors=${index}`} className="flex items-center">
                <span className={`w-3 h-3 block rounded-full mr-2 bg-${StatusColor[status as keyof typeof StatusColor]}`}></span>

                {StatusView[status as keyof typeof StatusView]}
              </div>
            )
          }
        </div>
      </div>
      <div className="block lg:hidden mt-4">
        <SchedulerMobile
          month={currentMonth}
          setMonth={setCurrentMonth}
        />
      </div>
    </>

  );
};