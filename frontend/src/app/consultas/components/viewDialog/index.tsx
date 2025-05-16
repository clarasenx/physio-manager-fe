import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatusView } from "@/constants/StatusView"
import { ListScheduleType } from "@/dtos/schedule/list-schedule.dto"
import { formatPhone } from "@/utils/formatPhone"
import { ReactNode } from "react"


export const ConsultaViewDialog = ({
  schedule,
  children
}: {
  schedule: ListScheduleType,
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
        <p>Nome do paciente: <b>{schedule.patient?.name}</b></p>
        <p>Telefone do paciente: <b>{formatPhone(schedule.patient?.phone)}</b></p>
        <p>Data da consulta: <b>{schedule.date.toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</b></p>
        <p>Status: <b>{StatusView[schedule.status]}</b></p>
        <div className="flex gap-10">
        {
          schedule.initialDiscomfort &&
            <p>Dor Inicial: <b>{schedule.initialDiscomfort}</b></p>
        }
        {
          schedule.finalDiscomfort &&
            <p>Dor Final: <b>{schedule.finalDiscomfort}</b></p>
        }

        </div>
        {
          schedule.notes &&
          <p>Anotações da consulta: <br /> <i>{schedule.notes}</i></p>
        }

      </DialogContent>
    </Dialog>
  )
}