'use client'

import { getDaysInMonth } from "@/utils/getDaysInMonth";
import { useState } from "react";
import { CalendarDay, EventType } from "../calendarDay";
import { isSameDay } from "@/utils/isSameDay";

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

  const mounth = currentMonth.toLocaleDateString('pt-BR', {
    month: 'long',
  });
  const days = getDaysInMonth(currentMonth); // Função utilitária

  return (
    <>
      <h2 className="font-bold text-xl mb-5">{capitalize(mounth)}</h2>
      <div className="grid grid-cols-7 grid-rows-1 gap-[1px] w-full">
        {weekDays.map((day, index) => (
          <p key={`WeekDay-${index}`} className="text-center mb-3 text-[#6A5242]">{day}</p>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-5 gap-[1px] w-full bg-[#D4D0C6] rounded-xl ">
        {days.map((date, index) => (
          <CalendarDay
            key={`CalendarDay-${index}`}
            date={date}
            events={events.filter(e => isSameDay(e.date, date))}
            index={index}
          />
        ))}
      </div>
    </>
  );
};