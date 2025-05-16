import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { danger } from "@/constants/ToastStyle"
import { ListScheduleType } from "@/dtos/schedule/list-schedule.dto"
import { scheduleKey } from "@/hooks/useSchedule"
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { toast } from "sonner"


export const ConsultaActiveDialog = ({
  schedule,
  children
}: {
  schedule: ListScheduleType,
  children: ReactNode
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  async function activeSchedule() {
    try {
      setIsLoading(true)

      await api.patch(`schedule/${schedule.id}/active`)
      
      queryClient.invalidateQueries({ queryKey: [scheduleKey], type: 'all' })
      
      toast("Consulta ativada com sucesso.")

      setIsLoading(false)
      setOpenDialog(false)
    }
    catch (err) {
      setIsLoading(false)
      toast("Ocorreu uma falha ao ativar a consulta.", {
        description: "Tente novamente mais tarde",
        style: danger
      })
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>Ativar consulta</DialogTitle>
        </DialogHeader>
        <p>Tem certeza que deseja ativar a consulta de <b>{schedule.patient?.name}</b></p>
        <p>Data da consulta: <b>{schedule.date.toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit' })}</b></p>
        <DialogFooter>
          <Button isLoading={isLoading} onClick={activeSchedule}>Ativar Consulta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}