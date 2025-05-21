'use client'
import api from "@/api/axios"
import { logout } from "@/app/actions/logout"
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
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"
import { toast } from "sonner"


interface LogoutDialogProps {
  children: ReactNode
}

export const LogoutDialog = ({
  children
}: LogoutDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();
  
  async function handleLogout() {
    setIsLoading(true)
    try {
      await logout()
      setIsLoading(false)
      router.replace("/login")
    }
    catch {
      setIsLoading(false)
      toast('Ocorreu um erro', {
        style: danger,
        description: 'Tente novamente mais tarde.'
      })
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
        <DialogHeader className="mb-5 sm:mb-0">
          <DialogTitle>Deseja sair da sua conta?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant={'destructive'} isLoading={isLoading} onClick={handleLogout}>Sair</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}