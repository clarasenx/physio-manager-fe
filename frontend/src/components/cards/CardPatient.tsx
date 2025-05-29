'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PatientType } from '@/dtos/patient/patient.schema'
import { formatPhone } from '@/utils/formatPhone'
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { DeleteDialog } from "../deleteDialog"
import { patientKey } from "@/hooks/usePatient"
import { PatientDialog } from "@/app/(private)/pacientes/components/formDialog"
import { getFormatedDate } from "@/utils/getFormatedDate"
import { X } from "lucide-react"
import { calculateAge } from "@/utils/calculateAge"
import { ListAppointmentByPatient } from "@/app/(private)/pacientes/components/listAppointmentByPatient"
import { Button } from "../ui/button"
import { useState } from "react"
import { danger } from "@/constants/ToastStyle"
import { toast } from "sonner"
import api from "@/api/axios"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const CardPatientTable = ({
  patient,
  setShowPatientDetails,
}: {
  patient: PatientType
  setShowPatientDetails: (patient: PatientType) => void
}) => {

  const formatedDate = getFormatedDate(patient.lastCompletedAppointment?.date)

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50">
      <td className="p-3">{patient.name}</td>
      <td className="p-3">{formatPhone(patient.phone)}</td>
      <td className="p-3">{formatedDate}</td>
      <td className="p-3">
        <div className="flex justify-center gap-2">
          <DeleteButton patient={patient} />
          <button
            onClick={() => setShowPatientDetails(patient)}
            className="bg-[#E3D4C0] cursor-pointer hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
            <FaEye size={14} />
          </button>
          <PatientDialog patient={patient}>
            <button className="bg-[#E3D4C0] cursor-pointer hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
              <FaPencilAlt size={14} />
            </button>
          </PatientDialog>
        </div>
      </td>
    </tr>
  )
}

export const PatientDetails = ({
  patient,
  close
}: {
  patient: PatientType
  close: () => void
}) => {

  const formatedDate = getFormatedDate(patient.lastCompletedAppointment?.date)
  const formatedDateBirthday = getFormatedDate(patient.birthday)
  const age = calculateAge(patient.birthday)

  return (
    <section className='hidden lg:flex flex-col w-fit text-nowrap text-[#2D231C] px-4 py-3 rounded-lg bg-[#F1EDE3]'>
      <div className="flex justify-between items-center pl-3 mb-3">
        <p className='font-semibold text-lg'>{patient.name}</p>
        <button onClick={close} className="cursor-pointer">
          <X></X>
        </button>
      </div>
      <div className='bg-white flex flex-col gap-2 px-4 py-3 rounded-lg'>
        {
          patient.birthday &&
          <div>
            <p className='font-semibold line-clamp-1'>Data de Nascimento</p>
            <p className='line-clamp-1'>{formatedDateBirthday} ({age} Anos)</p>
          </div>
        }
        {
          patient.phone &&
          <div>
            <p className='font-semibold line-clamp-1 t'>Telefone</p>
            <p className='line-clamp-1'>{formatPhone(patient.phone)}</p>
          </div>
        }
        <div>
          <p className='font-semibold line-clamp-1'>Última consulta</p>
          <p className='line-clamp-1'>{formatedDate}</p>
        </div>
        {
          patient.email &&
          <div>
            <p className='font-semibold line-clamp-1'>Email</p>
            <p className='line-clamp-1'>{patient.email}</p>
          </div>
        }
      </div>

      <ListAppointmentByPatient patientId={patient.id} />
    </section>
  )
}

export const CardPatientMobile = ({ patient }: { patient: PatientType }) => {

  const formatedDateLastAppointment = getFormatedDate(patient.lastCompletedAppointment?.date)
  const formatedDateBirthday = getFormatedDate(patient.birthday)

  return (
    <div className='h-fit flex flex-col px-3 sm:px-4 border rounded-xl shadow-md bg-white'>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{patient.name}</AccordionTrigger>
          <AccordionContent>
            <div className='flex items-center gap-2'>
              <p className='text-[#82654C] font-semibold'>Telefone:</p>
              <p>{formatPhone(patient.phone)}</p>
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-[#82654C] font-semibold'>Nascimento:</p>
              <p>{formatedDateBirthday}</p>
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-[#82654C] w-fit font-semibold'>Última consulta:</p>
              <p>{formatedDateLastAppointment}</p>
            </div>

            <ListAppointmentByPatient isMobile patientId={patient.id} />

            <div className="flex justify-center gap-2">
              <DeleteButton patient={patient} />

              <PatientDialog patient={patient}>
                <button className="bg-[#E3D4C0] cursor-pointer hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
                  <FaPencilAlt size={14} />
                </button>
              </PatientDialog>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function DeleteButton({
  patient
}: {
  patient: PatientType
}) {
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError && err.status === 409) {
      setOpenDialog(true)
      return
    }
    toast("Ocorreu uma falha ao apagar.", {
      description: "Tente novamente mais tarde",
      style: danger
    })
  }

  const deletePatientWithAppointments = async () => {
    try {
      setIsLoading(true)

      await api.delete(`/patient/${patient.id}`, { params: { delete_appointments: true } })

      queryClient.refetchQueries({
        queryKey: [patientKey]
      })

      toast("Paciente e suas consultas foram apagadas com sucesso.")

      setIsLoading(false)
      setOpenDialog(false)
    }
    catch {
      toast("Ocorreu uma falha ao apagar.", {
        description: "Tente novamente mais tarde",
        style: danger
      })
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <>
      <DeleteDialog
        title="Tem certeza que deseja apagar o paciente: "
        name={patient.name}
        queryKey={patientKey}
        path={`/patient/${patient.id}`}
        handleError={handleError}
      >
        <button className="bg-[#E3D4C0] cursor-pointer hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
          <FaTrash size={14} />
        </button>
      </DeleteDialog>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
          <DialogHeader>
            <DialogTitle>Atenção</DialogTitle>
          </DialogHeader>
          Apagar o paciente irá apagar as consultas vinculadas a ele também, deseja prosseguir?
          <DialogFooter>
            <Button variant={'outline'} onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button variant={'destructive'} isLoading={isLoading} onClick={deletePatientWithAppointments}>
              Apagar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}