import { useState } from "react"
import { Calendar } from "../ui/calendar"
import { useAppointment } from "@/hooks/useAppointment"
import CardConsulta from "../cards/Consultas/CardConsultas"

import { ErrorMessage } from "../ErrorMessage"
import { CircularProgress } from "@mui/material"
import { Button } from "../ui/button"
import { LuCirclePlus } from "react-icons/lu"
import { ConsultaCreateDialog } from '@/app/(private)/consultas/components/createDialog'

export const AppointmentrMobile = ({ month, setMonth }: { month: Date, setMonth: (m: Date) => void }) => {
  const [initialDate, setInitialDate] = useState<Date | undefined>(new Date())
  const [finalDate, setFinalDate] = useState<Date | undefined>(new Date())

  const appointment = useAppointment({ initialDate, finalDate })

  const handleSelectDate = (selected: Date | undefined) => {
    if (selected) {
      const startOfDay = new Date(selected)
      startOfDay.setHours(0, 0, 0, 0)

      const endOfDay = new Date(selected)
      endOfDay.setHours(23, 59, 59, 999)

      setInitialDate(startOfDay)
      setFinalDate(endOfDay)
    }
  }

  return (
    <div className="w-full flex items-center flex-col">
      <Calendar
        selected={initialDate}
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
      <ConsultaCreateDialog date={initialDate}>
        <Button><LuCirclePlus/>Nova Consulta</Button>
      </ConsultaCreateDialog>

      <div className="w-full bg-[#B7A17D] items-center flex flex-col p-4 gap-2 rounded-lg mt-4">
        {
          appointment.isPending ? <CircularProgress color="inherit" /> : appointment.isError ? <ErrorMessage name='consultas' refetch={appointment.refetch} /> :
            !appointment.data.length ? <p className="text-center text-white">Não há consultas marcadas</p> :
              appointment.data?.map(item => <CardConsulta key={item.id} item={item} />)
        }
      </div>
    </div>
  )
}