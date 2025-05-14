import { useState } from "react"
import { Calendar } from "../ui/calendar"
import { useSchedule } from "@/hooks/useSchedule"
import CardConsulta from "../cards/Consultas/CardConsultas"

import { ErrorMessage } from "../ErrorMessage"
import { CircularProgress } from "@mui/material"
import { ConsultaCreateDialog } from "@/app/consultas/components/createDialog"
import { Button } from "../ui/button"
import { LuCirclePlus } from "react-icons/lu"

export const SchedulerMobile = ({ month, setMonth }: { month: Date, setMonth: (m: Date) => void }) => {
  const [initialDate, setInitialDate] = useState<Date | undefined>(new Date())
  const [finalDate, setFinalDate] = useState<Date | undefined>(new Date())

  const schedule = useSchedule({ initialDate, finalDate })

  const handleSelectDate = (selected: Date | undefined) => {
    if (selected) {
      const startOfDay = new Date(selected)
      startOfDay.setHours(0, 0, 0, 0)

      const endOfDay = new Date(selected)
      endOfDay.setHours(23, 59, 59, 999)

      setInitialDate(startOfDay)
      setFinalDate(endOfDay)

      console.log("Data inicial:", startOfDay)
      console.log("Data final:", endOfDay)
    }
  }

  return (
    <div className="w-full flex items-center flex-col">
      <Calendar
        selected={initialDate}
        className="bg-[#F6F5F2] rounded-lg"
        month={month}
        onMonthChange={setMonth}
        classNames={{
          caption: 'hidden'
        }}
        onSelect={handleSelectDate}
        mode="single"

      />
      <ConsultaCreateDialog date={initialDate}>
        <Button><LuCirclePlus/>Nova Consulta</Button>
      </ConsultaCreateDialog>

      <div className="w-full bg-[#B7A17D] items-center flex flex-col p-4 gap-2 rounded-lg mt-4">
        {
          schedule.isPending ? <CircularProgress color="inherit" /> : schedule.isError ? <ErrorMessage refetch={schedule.refetch} /> :
            !schedule.data.length ? <p className="text-center text-white">Não há consultas marcadas</p> :
              schedule.data?.map(item => <CardConsulta key={item.id} item={item} />)
        }
      </div>
    </div>
  )
}