"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import { TratamentoCreateForm } from "./form"
import { TratamentoType } from '@/dtos/tratamentos/tratamento.schema'

type TratamentoCreateDialogProps = {
  children: ReactNode
  tratamento?: TratamentoType
}

export const TratamentoCreateDialog = ({ children, tratamento }: TratamentoCreateDialogProps) => {
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
        <TratamentoCreateForm closeModal={() => { setOpenDialog(false) }}/>
      </DialogContent>
    </Dialog>
  )
}