import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import { ConsultaActionForm } from "./form"
import { actionTypeView } from "@/constants/actionTypeView"
import { isAppointmentStarted } from "@/utils/isAppointmentStarted"
import { ListAppointmentType } from "@/dtos/appointment/list-appointment.dto"


export const ConsultaActionDialog = ({
  appointment,
  children,
  closeMenu,
}: {
  appointment: ListAppointmentType,
  closeMenu: () => void
  children: ReactNode,
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  const actionType: 'START' | 'CONCLUDE' = isAppointmentStarted(appointment) ?
    'CONCLUDE' : 'START'

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>{actionTypeView[actionType]} consulta</DialogTitle>
        </DialogHeader>
        <ConsultaActionForm appointment={appointment} closeModal={() => {
          setOpenDialog(false)
          closeMenu()
        }} />
      </DialogContent>
    </Dialog>
  )
}