'use client'

import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { danger } from "@/constants/ToastStyle"
import { RequestResetPasswordSchema, RequestResetPasswordType } from "@/dtos/user/reset-password"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const EmailForm = ({
  setEmail
}: {
  setEmail: (email: string) => void
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<RequestResetPasswordType>({
    resolver: zodResolver(RequestResetPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  async function onSubmit(data: RequestResetPasswordType) {
    try {
      setIsLoading(true)

      await api.post('/user/request-reset-password', data)

      toast('Código enviado!', { description: 'Verifique seu email.' })

      setEmail(data.email)
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
      }

      toast('Ocorreu um erro ao enviar o códito', {
        description: 'Tente novamente mais tarde.',
        style: danger
      })
      
    } finally {
      setIsLoading(false)
    }
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <label className='font-medium text-[#2D231C]'>Email</label>
              <Input className='border border-[#B7A17D] h-11 px-3 rounded-none' placeholder="Digite seu email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center gap-4 mt-2">
          <Button type="submit" isLoading={isLoading} className="rounded-none w-full">
            Enviar Codigo
          </Button>
        </div>
      </form>
    </Form>



  )
}