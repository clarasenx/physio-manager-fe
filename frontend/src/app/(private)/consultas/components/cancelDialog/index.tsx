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
import { AppointmentType } from "@/dtos/appointment/appointment.schema"
import { appointmentKey } from "@/hooks/useAppointment"
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { toast } from "sonner"


export const ConsultaCancelDialog = ({
  appointment,
  children
}: {
  appointment: AppointmentType,
  children: ReactNode
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  async function cancelAppointment() {
    try {
      setIsLoading(true)

      await api.patch(`appointment/${appointment.id}/cancel`)
      
      queryClient.invalidateQueries({ queryKey: [appointmentKey], type: 'all' })
      
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
        <p>Tem certeza que deseja cancelar a consulta de <b>{appointment.patient?.name}</b></p>
        <p>Data da consulta: <b>{appointment.date.toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit' })}</b></p>
        <DialogFooter>
          <Button variant={'destructive'} isLoading={isLoading} onClick={cancelAppointment}>Cancelar Consulta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}