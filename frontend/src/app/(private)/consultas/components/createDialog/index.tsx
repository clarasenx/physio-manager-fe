import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import { ConsultaCreateForm } from "./form"


export const ConsultaCreateDialog = ({
  date,
  children
}: {
  date?: Date,
  children: ReactNode
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>Criar consulta</DialogTitle>
        </DialogHeader>
        <ConsultaCreateForm date={date} closeModal={() => { setOpenDialog(false) }} />
      </DialogContent>
    </Dialog>
  )
}