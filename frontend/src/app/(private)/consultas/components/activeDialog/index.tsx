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
import { ListAppointmentType } from "@/dtos/appointment/list-appointment.dto"
import { appointmentKey } from "@/hooks/useAppointment"
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { toast } from "sonner"


export const ConsultaActiveDialog = ({
  appointment,
  children
}: {
  appointment: ListAppointmentType,
  children: ReactNode
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  async function activeAppointment() {
    try {
      setIsLoading(true)

      await api.patch(`appointment/${appointment.id}/active`)
      
      queryClient.invalidateQueries({ queryKey: [appointmentKey], type: 'all' })
      
      toast("Consulta ativada com sucesso.")

      setIsLoading(false)
      setOpenDialog(false)
    }
    catch {
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
        <p>Tem certeza que deseja ativar a consulta de <b>{appointment.patient?.name}</b></p>
        <p>Data da consulta: <b>{appointment.date.toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit' })}</b></p>
        <DialogFooter>
          <Button isLoading={isLoading} onClick={activeAppointment}>Ativar Consulta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}