import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import { ConsultaEditForm } from "./form"
import { AppointmentType } from "@/dtos/appointment/appointment.schema"


export const ConsultaEditDialog = ({
  appointment,
  children,
  closeMenu
}: {
  appointment: AppointmentType
  children: ReactNode
  closeMenu: () => void
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>Editar consulta</DialogTitle>
        </DialogHeader>
        <ConsultaEditForm appointment={appointment} closeModal={() => {
          setOpenDialog(false)
          closeMenu()
        }} />
      </DialogContent>
    </Dialog>
  )
}