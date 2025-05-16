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


export const TratamentoCreateDialog = ({
  children
}: {
  children: ReactNode
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>Criar tratamento</DialogTitle>
        </DialogHeader>
        <TratamentoCreateForm closeModal={() => { setOpenDialog(false) }} />
      </DialogContent>
    </Dialog>
  )
}