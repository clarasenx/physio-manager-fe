"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import { TratamentoForm } from "./form"
import { TratamentoType } from '@/dtos/tratamentos/tratamento.schema'

type TratamentoDialogProps = {
  children: ReactNode
  tratamento?: TratamentoType
}

export const TratamentoDialog = ({ children, tratamento }: TratamentoDialogProps) => {
  const [ openDialog, setOpenDialog ] = useState(false)

  const isEditing = !!tratamento?.id

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar tratamento" : "Criar tratamento"}</DialogTitle>
        </DialogHeader>
        <TratamentoForm closeModal={() => { setOpenDialog(false) }} tratamento={tratamento}/>
      </DialogContent>
    </Dialog>
  )
}