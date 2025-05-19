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
import { TratamentoType } from '@/dtos/tratamentos/tratamento.schema'
import { tratamentoKey } from '@/hooks/useTratamento'
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { toast } from "sonner"


export const TratamentosDeleteDialog = ({
  tratamento,
  children
}: {
  tratamento: TratamentoType,
  children: ReactNode
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  async function deleteTratamento() {
    try {
      setIsLoading(true)

      await api.delete(`appointment-type/${tratamento.id}`)
      
      queryClient.invalidateQueries({ queryKey: [tratamentoKey], type: 'all' })
      
      toast("Tratamento apagado com sucesso.")

      setIsLoading(false)
      setOpenDialog(false)
    }
    catch {
      setIsLoading(false)
      toast("Ocorreu uma falha ao apagar tratamento.", {
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
          <DialogTitle>Apagar Tratamento</DialogTitle>
        </DialogHeader>
        <p>Tem certeza que deseja apagar este tratamento: <b>{tratamento.name}</b></p>
        <p>Esta ação não poderá ser desfeita</p>
        <DialogFooter>
          <Button variant={'destructive'} isLoading={isLoading} onClick={deleteTratamento}>Apagar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}