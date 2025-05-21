import { useEffect, useMemo, useState } from "react"
import { Calendar } from "../ui/calendar"
import { useAppointment } from "@/hooks/useAppointment"
import CardConsulta from "../cards/Consultas/CardConsultas"

import { ErrorMessage } from "../ErrorMessage"
import { CircularProgress } from "@mui/material"
import { Button } from "../ui/button"
import { LuCirclePlus } from "react-icons/lu"
import { ConsultaCreateDialog } from '@/app/(private)/consultas/components/createDialog'
import { ListAppointmentType } from "@/dtos/appointment/list-appointment.dto"
import { IRangeDate } from "."
import { isSameDay } from "date-fns"

export const AppointmentMobile = ({
  month,
  setMonth,
  rangeMonth
}: {
  month: Date,
  setMonth: (m: Date) => void
  rangeMonth: IRangeDate
}) => {
  const [daySelected, setDaySelected] = useState<Date>(new Date())

  const appointment = useAppointment({
    initialDate: rangeMonth.initial,
    finalDate: rangeMonth.final
  })

  useEffect(() => {
    setDaySelected(month)
  }, [month])

  return (
    <div className="w-full flex items-center flex-col">
      <Calendar
        selected={daySelected}
        weekStartsOn={0}
        className="bg-[#F6F5F2] rounded-lg mb-2"
        month={month}
        onMonthChange={setMonth}
        classNames={{
          caption: 'hidden'
        }}
        onSelect={(date) => date ? setDaySelected(date) : null}
        appointments={appointment.data ? appointment.data : []}
        mode="single"

      />
      <ConsultaCreateDialog date={daySelected}>
        <Button><LuCirclePlus />Nova Consulta</Button>
      </ConsultaCreateDialog>

      <div className="w-full bg-[#B7A17D] items-center flex flex-col p-4 gap-2 rounded-lg mt-4">
        {
          appointment.isPending ? <CircularProgress color="inherit" /> : appointment.isError ? <ErrorMessage name='consultas' refetch={appointment.refetch} /> :
            !appointment.data.length ? <p className="text-center text-white">Não há consultas marcadas</p> :
              <AppointmentList appointments={appointment.data} currentDay={daySelected} />
        }
      </div>
    </div>
  )
}

function AppointmentList({
  appointments,
  currentDay
}: { appointments: ListAppointmentType[], currentDay: Date }) {
  const appointmentsOfDay = useMemo(() => {
    return appointments.filter(a => {
      const date = new Date(a.date)
      return isSameDay(date, currentDay)
    })
  }, [appointments, currentDay])

  return (
    <>
      {
        !appointmentsOfDay.length ? <p className="text-center text-white">Não há consultas marcadas para este dia</p> :
          appointmentsOfDay?.map(item => <CardConsulta key={`cardConsultaMobile-${item.id}`} item={item} />)
      }
    </>
  )
}