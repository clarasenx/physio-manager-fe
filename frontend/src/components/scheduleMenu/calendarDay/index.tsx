'use client'

import { isSameDay } from "@/utils/isSameDay";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { ScheduleMenu } from "..";

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
  isCurrentMonth: boolean
}

const indexOfEndWeek = [0, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41]

const EventCard = ({ event, isCurrentMonth }: { event: EventType, isCurrentMonth: boolean }) => {
  const [showActions, setShowActions] = useState(false);

  const toggleActions = () => {
    if(!isCurrentMonth) return
    setShowActions(!showActions)
  }

  return (
    <div
      className={`relative mt-1 bg-[#9b7b61]  rounded text-xs ${isCurrentMonth ? 'cursor-pointer' : ''}`}
    >
      <div onClick={() => toggleActions()} className="h-full w-full py-1 px-2 text-white">
        {event.time} - {event.title}
        <span className="absolute top-1 right-1">
          ⋮
        </span>
      </div>

      {showActions && (

          <ScheduleMenu
            menuAberto={showActions}
            setMenuAberto={setShowActions}
            className='absolute top-7 right-0 bg-[#F1EDE3] z-50'
          />
          
      )}
    </div>
  );
};

export const CalendarDay = ({ date, events, index, isCurrentMonth }: ICalendarDay) => {
  const currentDate = new Date()
  const isCurrentDate = isSameDay(currentDate, date)


  const [isHover, setIsHover] = useState<boolean>(false)

  return (
    <div className={`bg-[${indexOfEndWeek.includes(index) ? '#F1EDE3' : '#F9F7F3'}] ${isCurrentMonth ? '' : 'opacity-70'} p-1 relative min-h-[110px] ${isCurrentDate ? 'border border-[#9b7b61]/50' : ''}`} onPointerEnter={() => setIsHover(true)} onPointerLeave={() => setIsHover(false)}>
      <div className="text-xxs text-[#2D231C] font-semibold text-right mr-3">{date.getDate()}</div>
      <div>
        {events.map(event => (
          <EventCard key={event.id} event={event} isCurrentMonth={isCurrentMonth}/>
        ))}
      </div>
      {
        isHover &&
        <div className="w-6 h-6 flex justify-center items-center rounded-sm bg-[#F1EDE3] absolute top-1 left-1 cursor-pointer">
          <BiPlus color="#6A5242" size={20} />
        </div>
      }
    </div>
  );
};
