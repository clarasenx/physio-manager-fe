'use client'
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
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { toast } from "sonner"


interface DeleteDialogProps {
  title: string
  name?: string
  queryKey: string
  path: string
  children: ReactNode
  close?: () => void
}

export const DeleteDialog = ({
  title,
  name,
  queryKey,
  path,
  children,
  close
}: DeleteDialogProps) => {
  const [ openDialog, setOpenDialog ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const queryClient = useQueryClient()

  async function deleteTratamento() {
    try {
      setIsLoading(true)

      await api.delete(`${path}`)

      queryClient.refetchQueries({
        queryKey: [ queryKey ]
      })

      toast("Apagado com sucesso.")
      if (close) {
        close()
      }
      setIsLoading(false)
      setOpenDialog(false)
    }
    catch {
      setIsLoading(false)
      toast("Ocorreu uma falha ao apagar.", {
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
          <DialogTitle>Apagar</DialogTitle>
        </DialogHeader>
        <p>{title}
          {
            name &&
            <b>{name}</b>
          }
        </p>
        <p>Esta ação não poderá ser desfeita</p>
        <DialogFooter>
          <Button variant={'destructive'} isLoading={isLoading} onClick={deleteTratamento}>Apagar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}