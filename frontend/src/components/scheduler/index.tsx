'use client'

import { getDaysInMonth } from "@/utils/getDaysInMonth";
import { useCallback, useMemo, useState } from "react";
import { CalendarDay } from "./calendarDay";
import { isSameDay } from "@/utils/isSameDay";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { StatusView } from "@/constants/StatusView";
import { StatusColor } from "@/constants/StatusColor";
import { AppointmentMobile } from "./mobile";
import { useAppointment } from "@/hooks/useAppointment";
import { useIsMobile } from "@/hooks/useIsMobile";

export interface IRangeDate {
  final: Date;
  initial: Date;
}

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

  const isMobile = useIsMobile()

  const mounth = useCallback(() => currentMonth.toLocaleDateString('pt-BR', {
    month: 'long',
  }), [currentMonth])

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth])  // Função utilitária

  const rangeMonth = useMemo(() => {
    const monthDays = days

    console.log('pc');


    const initial = new Date(monthDays[0].date)
    initial.setHours(0, 0, 0, 0)

    const final = new Date(monthDays[monthDays.length - 1].date)
    final.setHours(23, 59, 59, 999)


    return {
      final,
      initial
    }
  }, [days])


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
          <h2 className="font-bold text-xl text-center w-28">{capitalize(mounth())}</h2>
          <IoIosArrowForward size={18} className="cursor-pointer" onClick={nextMonth} />
        </div>
        <span className="flex items-center mr-2 font-medium">{currentMonth.toLocaleDateString('pt-br', { year: 'numeric' })}</span>
      </div>
      {
        isMobile ?
          <AppointmentMobile
            month={currentMonth}
            setMonth={setCurrentMonth}
            rangeMonth={rangeMonth}
          /> :
          <Calendar
            days={days}
            rangeMonth={rangeMonth} />
      }
    </>

  );
};

function Calendar({
  days,
  rangeMonth,
}: {
  days: {
    date: Date;
    isCurrentMonth: boolean;
  }[]
  rangeMonth: IRangeDate
}) {

  const appointment = useAppointment({
    initialDate: rangeMonth.initial,
    finalDate: rangeMonth.final
  })

  return (
    <>
      <div className="grid grid-cols-7  grid-rows-1 gap-[1px] rounded-t-xl bg-[#D4D0C6] border-b border-[#D4D0C6] overflow-hidden w-full">
        {weekDays.map((day, index) => (
          <p key={`WeekDay-${index}`} className="text-center font-medium bg-[#F6F5F2] h-full py-2 text-[#6A5242]">{day}</p>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-5 gap-[1px] w-full bg-[#D4D0C6] rounded-b-xl overflow-hidden">
        {
          !appointment.isPending && !appointment.isError ?
            days.map((date, index) => (
              <CalendarDay
                key={`CalendarDay-${index}`}
                date={date.date}
                isCurrentMonth={date.isCurrentMonth}
                events={appointment.data?.filter(e => isSameDay(e.date, date.date)) || []}
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
    </>
  )
}