'use client'

import { useState } from "react";
import { BiPlus } from "react-icons/bi";

export type EventType = {
  id: string;
  title: string;
  time: string; // "14h"
  date: Date;
};

interface ICalendarDay {
  date: Date,
  events: EventType[]
  index: number
}

const indexOfEndWeek = [0, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41]

const EventCard = ({ event }: { event: EventType }) => {
  const [showActions, setShowActions] = useState(false);

  const toggleActions = () => setShowActions(!showActions) 

  return (
    <div
      className="relative mt-1 bg-[#9b7b61] text-white rounded text-xs cursor-pointer"
    >
      <div onClick={() => toggleActions()} className="h-full w-full p-1">
        {event.time} - {event.title}
        <span className="absolute top-1 right-1">
          ⋮
        </span>
      </div>

      {showActions && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => toggleActions()}></div>
          <div className="absolute z-50 top-6 right-0 bg-white text-black text-sm rounded shadow p-2">
            <button>👁 Visualizar</button><br />
            <button>✏️ Editar Consulta</button><br />
            <button>❌ Cancelar Consulta</button>
          </div>
        </>
      )}
    </div>
  );
};

export const CalendarDay = ({ date, events, index }: ICalendarDay) => {

  const [isHover, setIsHover] = useState<boolean>(false)

  return (
    <div className={`bg-[${indexOfEndWeek.includes(index) ? '#F1EDE3' : '#F9F7F3'}] p-1 relative min-h-[110px]`} onPointerEnter={() => setIsHover(true)} onPointerLeave={() => setIsHover(false)}>
      <div className="text-xxs text-[#2D231C] font-semibold text-right mr-3">{date.getDate()}</div>
      <div>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {
        isHover &&
        <div className="w-6 h-6 flex justify-center items-center rounded-sm bg-[#F1EDE3] absolute top-1 left-1">
          <BiPlus color="#6A5242" size={20} />
        </div>
      }
    </div>
  );
};