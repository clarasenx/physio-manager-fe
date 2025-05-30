import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { actionTypeView } from "@/constants/actionTypeView"
import { AppointmentType } from "@/dtos/appointment/appointment.schema"
import { isAppointmentStarted } from "@/utils/isAppointmentStarted"
import { ReactNode, useState } from "react"
import { ConsultaActionForm } from "./form"


export const ConsultaActionDialog = ({
  appointment,
  children,
  closeMenu,
  notes
}: {
  appointment: AppointmentType,
  closeMenu?: () => void
  children: ReactNode,
  notes?: string
}) => {
  const [ openDialog, setOpenDialog ] = useState(false)

  const isStarted = isAppointmentStarted(appointment)

  const actionType: 'START' | 'CONCLUDE' = isStarted ?
    'CONCLUDE' : 'START'

  const handleOpen = (open: boolean) => {
    setOpenDialog(open)
    if (!open && closeMenu) {
      closeMenu()
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>{actionTypeView[ actionType ]} consulta</DialogTitle>
        </DialogHeader>
        <ConsultaActionForm appointment={appointment} closeModal={() => handleOpen(false)} notes={notes}/>
      </DialogContent>
    </Dialog>
  )
}