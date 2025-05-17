import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod';
import api from "@/api/axios"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { scheduleKey } from "@/hooks/useSchedule"
import { AxiosError } from "axios"
import { danger } from "@/constants/ToastStyle"
import { CreateTratamentoSchema, CreateTratamentoType } from '@/dtos/tratamentos/create-tratamento.dto'
import { Textarea } from '@/components/ui/textarea';

export const TratamentoCreateForm = ({
  closeModal,
}: {
  closeModal: () => void
}) => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreateTratamentoType>({resolver: zodResolver(CreateTratamentoSchema)})


  async function onSubmit(data: CreateTratamentoType, force?: boolean)  {
    const params = force ? { force } : {}
    try {
      setIsLoading(true)
      await api.post('appointment-type', data, { params })
      
      queryClient.invalidateQueries({ queryKey: [scheduleKey], type: 'all' })
      
      setIsLoading(false)
      toast("Tratamento criado com sucesso.")
      closeModal()
    }
    catch (err) {
      setIsLoading(false)
      if (!(err instanceof AxiosError)) {
        toast("Ocorreu uma falha ao criar o tratamento.", {
          description: "Tente novamente mais tarde",
          style: danger
        })
        return
      }
      }
      toast("Ocorreu uma falha ao criar o tratamento.", {
        description: "Tente novamente mais tarde",
        style: danger
      })
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => onSubmit(data, false))}>
          <div className="mb-4 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do tratamento</FormLabel>
                    <Input  {...field} value={field.value}/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do tratamento</FormLabel>
                    <Textarea  {...field} value={field.value ?? undefined}/>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant={'secondary'} onClick={() => closeModal()}>Cancelar</Button>
            <Button type="submit" isLoading={isLoading}>Criar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}