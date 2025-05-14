'use client'

import { isSameDay } from "@/utils/isSameDay";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ScheduleMenu } from "../../../app/consultas/components/scheduleMenu";
import { BiPlus } from "react-icons/bi";
import { createPortal } from "react-dom";
import { StatusColor } from "@/constants/StatusColor";
import { ConsultaCreateDialog } from "@/app/consultas/components/createDialog";
import { ListScheduleType } from "@/dtos/schedule/list-schedule.dto";

export type EventType = {
  id: string;
  title: string;
  time: string; // "14h"
  date: Date;
};

interface ICalendarDay {
  date: Date,
  events: ListScheduleType[]
  index: number
  isCurrentMonth: boolean
}

const indexOfEndWeek = [0, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41]


type PortalProps = {
  children: ReactNode;
};

export const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};


const EventCard = ({ event, isCurrentMonth }: { event: ListScheduleType, isCurrentMonth: boolean }) => {
  const [showActions, setShowActions] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleActions = () => {
    if (!isCurrentMonth) return;
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setMenuPosition({ top: rect.top + 3, left: rect.left + (rect.width / 2) });
    }
    setShowActions(!showActions);
  };

  return (
    <div
      className={`relative mt-1 bg-${StatusColor[event.status]}  rounded text-xs ${isCurrentMonth ? 'cursor-pointer' : ''}`}
    >
      <div ref={ref} onClick={() => toggleActions()} className="h-full w-full py-1 px-2 text-white">
        {event.date.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })} - {event.patient?.name}
        <span className="absolute top-1 right-1">
          ⋮
        </span>
      </div>

      {showActions && (
        <Portal>
          <div style={{ position: 'absolute', top: menuPosition.top, left: menuPosition.left, zIndex: 10 }} className="hidden lg:block">
            <ScheduleMenu
              menuAberto={showActions}
              setMenuAberto={setShowActions}
              className='absolute top-7 right-0 bg-[#F6F5F2] z-50'
              schedule={event}
            />
          </div>
        </Portal>

      )}
    </div>
  );
};

export const CalendarDay = ({ date, events, index, isCurrentMonth }: ICalendarDay) => {
  const currentDate = new Date()
  const isCurrentDate = isSameDay(currentDate, date)

  const [activeCreateConsultaButton, setActiveCreateConsultaButton] = useState(false)
  const [isHover, setIsHover] = useState<boolean>(false)

  return (
    <div className={`bg-[${indexOfEndWeek.includes(index) ? '#F6F5F2' : '#F9F7F3'}] ${isCurrentMonth ? '' : 'opacity-70'} py-1 relative h-[110px] ${isCurrentDate ? 'border border-[#9b7b61]/50' : ''}`} onPointerEnter={() => setIsHover(true)} onPointerLeave={() => setIsHover(false)}>
      <div className="text-xxs text-[#2D231C] font-semibold text-right mr-3">{date.getDate()}</div>
      <div className="overflow-auto max-h-[80px] seu-container px-1">
        {events.map(event => (
          <EventCard key={event.id} event={event} isCurrentMonth={isCurrentMonth} />
        ))}
      </div>
      <ConsultaCreateDialog date={date}>
        {
          isHover &&
          <div className="w-6 h-6 flex justify-center items-center rounded-sm bg-[#F6F5F2] absolute top-1 left-1 cursor-pointer">
            <BiPlus color="#6A5242" size={20} />
          </div>
        }
      </ConsultaCreateDialog>
    </div>
  );
};
