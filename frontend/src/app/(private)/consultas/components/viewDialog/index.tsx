import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatusView } from "@/constants/StatusView"
import { AppointmentType } from "@/dtos/appointment/appointment.schema"
import { formatPhone } from "@/utils/formatPhone"
import { getFormatedDate } from "@/utils/getFormatedDate"
import { ReactNode } from "react"


export const ConsultaViewDialog = ({
  appointment,
  children,
  closeMenu
}: {
  appointment: AppointmentType,
  children: ReactNode
  closeMenu: () => void
}) => {

  const handleOpen = (open: boolean) => {
    if (!open) {
      closeMenu()
    }
  }

  return (
    <Dialog onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>Dados da Consulta</DialogTitle>
        </DialogHeader>
        <p>Nome do paciente: <b>{appointment.patient?.name}</b></p>
        <p>Tratamento: <b>{appointment.appointmentType ? appointment.appointmentType?.name : 'Indefinido'}</b></p>
        <p>Telefone do paciente: <b>{formatPhone(appointment.patient?.phone)}</b></p>
        <p>Data da consulta: <b>{getFormatedDate(appointment.date, true)}</b></p>
        <p>Status: <b>{StatusView[ appointment.status ]}</b></p>
        <div className="flex gap-10">
          {
            appointment.initialDiscomfort &&
            <p>Dor Inicial: <b>{appointment.initialDiscomfort}</b></p>
          }
          {
            appointment.finalDiscomfort &&
            <p>Dor Final: <b>{appointment.finalDiscomfort}</b></p>
          }

        </div>
        {
          appointment.notes &&
          <div>
            <p>Anotações da consulta:</p>
            <p className="px-2 py-1 rounded underline  underline-offset-4"><i>{appointment.notes}</i></p>
          </div>
        }
        <DialogFooter>
          <p className="text-sm mt-2">Registrada em {getFormatedDate(appointment.createdAt, true)}</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}