'use client'

import { isSameDay } from "@/utils/isSameDay";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsEye, BsPencil, BsX } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";

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

const EventCard = ({ event }: { event: EventType }) => {
  const [showActions, setShowActions] = useState(false);

  const toggleActions = () => setShowActions(!showActions)

  return (
    <div
      className="relative mt-1 bg-[#9b7b61] text-white rounded text-xs cursor-pointer"
    >
      <div onClick={() => toggleActions()} className="h-full w-full py-1 px-2">
        {event.time} - {event.title}
        <span className="absolute top-1 right-1">
          ⋮
        </span>
      </div>

      {showActions && (
        <>

          <div
            className={`inset-0 bg-black/25 z-40 fixed cursor-default`}
            onClick={() => toggleActions()}
          />
          <div
            className={`
              absolute w-full z-50 top-7 cursor-default right-0 bg-[#F1EDE3] text-black text-sm rounded shadow py-2 px-1 bg-[#F1EDE3]
            `}
          >
            <button className="flex cursor-pointer gap-0.5 text-xs items-center w-full rounded-sm text-start text-nowrap truncate font-medium text-[#6A5242] p-0.5 xl:p-1 2xl:p-2 2xl:text-sm 2xl:gap-1 hover:bg-[#6A5242] hover:text-[#F1EDE3]">
              <BsEye className="hidden xl:block shrink-0" size={20} /> Visualizar
            </button>
            <button className="flex cursor-pointer gap-0.5 text-xs items-center w-full rounded-sm text-start text-nowrap truncate font-medium text-[#6A5242] p-0.5 xl:p-1 2xl:p-2 2xl:text-sm 2xl:gap-1 hover:bg-[#6A5242] hover:text-[#F1EDE3]">
              <BsPencil className="hidden xl:block shrink-0" size={20} /> Editar
            </button>
            <button className="flex cursor-pointer gap-0.5 text-xs items-center w-full rounded-sm text-start text-nowrap truncate font-medium text-[#6A5242] p-0.5 xl:p-1 2xl:p-2 2xl:text-sm 2xl:gap-1 hover:bg-[#6A5242] hover:text-[#F1EDE3]">
              <BsX className="hidden xl:block shrink-0" size={20} /> Cancelar
            </button>
          </div>
        </>
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
          <EventCard key={event.id} event={event} />
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
