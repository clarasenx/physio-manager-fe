"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import { UserForm } from "./form"
import { ListUserType } from "@/dtos/user/list-user.dto"

type UserDialogProps = {
  children: ReactNode
  user: ListUserType
}

export const UserDialog = ({ children, user }: UserDialogProps) => {
  const [ openDialog, setOpenDialog ] = useState(false)

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#F6F5F2]">
        <DialogHeader>
          <DialogTitle>Editar Seus Dados</DialogTitle>
        </DialogHeader>
        <UserForm closeModal={() => { setOpenDialog(false) }} user={user}/>
      </DialogContent>
    </Dialog>
  )
}