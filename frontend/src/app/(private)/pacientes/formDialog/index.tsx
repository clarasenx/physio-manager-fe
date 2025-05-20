"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import { PatientForm } from "./form"
import { PatientType } from "@/dtos/patient/patient.schema"

type PatientDialogProps = {
  children: ReactNode
  patient?: PatientType
}

export const PatientDialog = ({ children, patient }: PatientDialogProps) => {
  const [ openDialog, setOpenDialog ] = useState(false)

  const isEditing = !!patient?.id

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[647px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar paciente" : "Criar paciente"}</DialogTitle>
        </DialogHeader>
        <PatientForm closeModal={() => { setOpenDialog(false) }} patient={patient}/>
      </DialogContent>
    </Dialog>
  )
}