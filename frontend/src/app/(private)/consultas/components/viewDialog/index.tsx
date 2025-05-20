import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatusView } from "@/constants/StatusView"
import { ListAppointmentType } from "@/dtos/appointment/list-appointment.dto"
import { formatPhone } from "@/utils/formatPhone"
import { ReactNode } from "react"


export const ConsultaViewDialog = ({
  appointment,
  children
}: {
  appointment: ListAppointmentType,
  children: ReactNode
}) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>Dados da Consulta</DialogTitle>
        </DialogHeader>
        <p>Nome do paciente: <b>{appointment.patient?.name}</b></p>
        <p>Telefone do paciente: <b>{formatPhone(appointment.patient?.phone)}</b></p>
        <p>Data da consulta: <b>{appointment.date.toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</b></p>
        <p>Status: <b>{StatusView[appointment.status]}</b></p>
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
          <p>Anotações da consulta: <br /> <i>{appointment.notes}</i></p>
        }

      </DialogContent>
    </Dialog>
  )
}