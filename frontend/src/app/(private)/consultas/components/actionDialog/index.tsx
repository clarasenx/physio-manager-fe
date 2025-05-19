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
import { isScheduleStarted } from "@/utils/isScheduleStarted"
import { ListScheduleType } from "@/dtos/schedule/list-schedule.dto"


export const ConsultaActionDialog = ({
  schedule,
  children,
  closeMenu,
}: {
  schedule: ListScheduleType,
  closeMenu: () => void
  children: ReactNode,
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  const actionType: 'START' | 'CONCLUDE' = isScheduleStarted(schedule) ?
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
        <ConsultaActionForm schedule={schedule} closeModal={() => {
          setOpenDialog(false)
          closeMenu()
        }} />
      </DialogContent>
    </Dialog>
  )
}