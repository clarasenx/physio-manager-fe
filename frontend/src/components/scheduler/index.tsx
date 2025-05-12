'use client'

import { getDaysInMonth } from "@/utils/getDaysInMonth";
import { useCallback, useState } from "react";
import { CalendarDay, EventType } from "../scheduleMenu/calendarDay";
import { isSameDay } from "@/utils/isSameDay";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
  const [events, setEvents] = useState<EventType[]>([
    {
      date: new Date(),
      id: '1',
      time: '23 h',
      title: 'teste'
    }
  ]);

  const mounth = useCallback(()=>currentMonth.toLocaleDateString('pt-BR', {
    month: 'long',
  }), [currentMonth])

  const days = useCallback(()=> getDaysInMonth(currentMonth), [currentMonth])  // Função utilitária

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
          <IoIosArrowBack size={18} className="cursor-pointer" onClick={previousMonth}/>
          <h2 className="font-bold text-xl">{capitalize(mounth())}</h2>
          <IoIosArrowForward size={18} className="cursor-pointer" onClick={nextMonth}/>
        </div>
        <span className="flex items-center mr-2 font-medium">{currentMonth.toLocaleDateString('pt-br', { year: 'numeric' })}</span>
      </div>
      <div className="grid grid-cols-7  grid-rows-1 gap-[1px] rounded-t-xl bg-[#D4D0C6] border-b border-[#D4D0C6] overflow-hidden w-full">
        {weekDays.map((day, index) => (
          <p key={`WeekDay-${index}`} className="text-center font-medium bg-[#F6F5F2] h-full py-2 text-[#6A5242]">{day}</p>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-5 gap-[1px] w-full bg-[#D4D0C6] rounded-b-xl overflow-hidden">
        {days().map((date, index) => (
          <CalendarDay
            key={`CalendarDay-${index}`}
            date={date.date}
            isCurrentMonth={date.isCurrentMonth}
            events={events.filter(e => isSameDay(e.date, date.date))}
            index={index}
          />
        ))}
      </div>
    </>
  );
};