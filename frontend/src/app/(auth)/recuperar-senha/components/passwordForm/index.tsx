'use client'

import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { danger } from "@/constants/ToastStyle"
import { ResetPasswordSchema, ResetPasswordType } from "@/dtos/user/reset-password"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const PasswordForm = ({
  email
}: {
  email: string
}) => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ typeInput, setTypeInput ] = useState<'password' | 'text'>('password')

  const route = useRouter()

  function handleEye() {
    if (typeInput === 'password') {
      setTypeInput('text')
    } else {
      setTypeInput('password')
    }
  }

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email,
      password: '',
      token: ''
    }
  })

  async function onSubmit(data: ResetPasswordType) {
    try {
      setIsLoading(true)

      await api.patch('/user/reset-password', data)

      toast('Senha alterada com sucesso!')

      route.replace('login')
      setIsLoading(false)
    }
    catch (err) {
      if (err instanceof AxiosError) {
        if (err.status === 404) {
          toast('Usuário não encontrado', {
            description: 'Verifique seu email.',
            style: danger
          })
          return
        }
        if (err.status === 401) {
          toast('Código inválido', {
            description: 'Verifique o código no seu email.',
            style: danger
          })
          return
        }
        if (err.status === 403) {
          toast('Código expirado', {
            description: 'Envie outro código.',
            style: danger
          })
          return
        }
      }

      toast('Ocorreu um erro ao enviar o códito', {
        description: 'Tente novamente mais tarde.',
        style: danger
      })
    } finally {
      setIsLoading(false)
    }
  }

  function InputIcon() {
    if (typeInput === 'password') {
      return <EyeOff className='cursor-pointer text-[#82654C]' onClick={handleEye} />
    }
    return <Eye className='cursor-pointer text-[#82654C]' onClick={handleEye} />
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem className="w-full">
              <label className='font-medium text-[#2D231C]'>Código de Verificação</label>
              <Input className='border border-[#B7A17D] h-11 px-3 rounded-none' placeholder="Informe o código" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <label className='font-medium text-[#2D231C]'>Nova Senha</label>
              <Input
                type={typeInput}
                rightIcon={<InputIcon />}
                className='border border-[#B7A17D] h-11 px-3 rounded-none' placeholder="Digite sua nova senha" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center gap-4 mt-2">
          <Button type="submit" isLoading={isLoading} className="rounded-none w-full">
            Salvar Senha
          </Button>
        </div>
      </form>
    </Form>



  )
}