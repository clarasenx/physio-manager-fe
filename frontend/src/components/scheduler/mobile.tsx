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

interface IRangeDate {
  initialDate: Date,
  finalDate: Date
}

export const AppointmentMobile = ({ month, setMonth }: { month: Date, setMonth: (m: Date) => void }) => {
  const [rangeDate, setRangeDate] = useState<IRangeDate>({ initialDate: new Date(), finalDate: new Date() })

  const rangeMonth = useMemo(() => {
    const initial = new Date(month)
    initial.setDate(1)
    initial.setHours(0, 0, 0, 0)

    const final = new Date(month)
    final.setMonth(final.getMonth() + 1)
    final.setDate(0)
    final.setHours(23, 59, 59, 999)

    return { initial, final }
  }, [month])

  const appointment = useAppointment({
    initialDate: rangeMonth.initial,
    finalDate: rangeMonth.final
  })

  const handleSelectDate = (selected: Date | undefined) => {
    if (selected) {
      const startOfDay = new Date(selected)
      startOfDay.setHours(0, 0, 0, 0)

      const endOfDay = new Date(selected)
      endOfDay.setHours(23, 59, 59, 999)

      setRangeDate({
        finalDate: endOfDay,
        initialDate: startOfDay
      })
    }
  }

  useEffect(()=> {
    handleSelectDate(month)
  }, [month])

  return (
    <div className="w-full flex items-center flex-col">
      <Calendar
        selected={rangeDate.initialDate}
        className="bg-[#F6F5F2] rounded-lg mb-2"
        month={month}
        onMonthChange={setMonth}
        classNames={{
          caption: 'hidden'
        }}
        onSelect={handleSelectDate}
        appointments={appointment.data ? appointment.data : []}
        mode="single"

      />
      <ConsultaCreateDialog date={rangeDate.initialDate}>
        <Button><LuCirclePlus />Nova Consulta</Button>
      </ConsultaCreateDialog>

      <div className="w-full bg-[#B7A17D] items-center flex flex-col p-4 gap-2 rounded-lg mt-4">
        {
          appointment.isPending ? <CircularProgress color="inherit" /> : appointment.isError ? <ErrorMessage name='consultas' refetch={appointment.refetch} /> :
            !appointment.data.length ? <p className="text-center text-white">Não há consultas marcadas</p> :
              <AppointmentList appointments={appointment.data} rangeDate={rangeDate} />
        }
      </div>
    </div>
  )
}

function AppointmentList({
  appointments,
  rangeDate
}: { appointments: ListAppointmentType[], rangeDate: IRangeDate }) {
  const appointmentsOfDay = useMemo(() => {
    return appointments.filter(a => {
      const date = new Date(a.date)
      const timeStamp = date.getTime()
      const finalTimeStamp = rangeDate.finalDate.getTime()
      const initialTimeStamp = rangeDate.initialDate.getTime()
      return timeStamp > initialTimeStamp && timeStamp < finalTimeStamp
    })
  }, [appointments, rangeDate])

  return (
    <>
      {
        !appointmentsOfDay.length ? <p className="text-center text-white">Não há consultas marcadas para este dia</p> :
          appointmentsOfDay?.map(item => <CardConsulta key={`cardConsultaMobile-${item.id}`} item={item} />)
      }
    </>
  )
}