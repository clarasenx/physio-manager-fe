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


export const ConsultaCancelDialog = ({
  schedule,
  children
}: {
  schedule: ListScheduleType,
  children: ReactNode
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  async function cancelSchedule() {
    try {
      setIsLoading(true)

      await api.patch(`schedule/${schedule.id}/cancel`)
      
      queryClient.invalidateQueries({ queryKey: [scheduleKey], type: 'all' })
      
      toast("Consulta cancelada com sucesso.")

      setIsLoading(false)
      setOpenDialog(false)
    }
    catch {
      setIsLoading(false)
      toast("Ocorreu uma falha ao cancelar a consulta.", {
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
          <DialogTitle>Cancelar consulta</DialogTitle>
        </DialogHeader>
        <p>Tem certeza que deseja cancelar a consulta de <b>{schedule.patient?.name}</b></p>
        <p>Data da consulta: <b>{schedule.date.toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit' })}</b></p>
        <DialogFooter>
          <Button variant={'destructive'} isLoading={isLoading} onClick={cancelSchedule}>Cancelar Consulta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}