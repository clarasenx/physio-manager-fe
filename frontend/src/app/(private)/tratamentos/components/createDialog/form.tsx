import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { danger } from "@/constants/ToastStyle"
import { CreateTratamentoSchema, CreateTratamentoType } from '@/dtos/tratamentos/create-tratamento.dto'
import { tratamentoKey } from '@/hooks/useTratamento'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const TratamentoCreateForm = ({
  closeModal,
}: {
  closeModal: () => void
}) => {
  const queryClient = useQueryClient()
  const [ isLoading, setIsLoading ] = useState(false)

  const form = useForm<CreateTratamentoType>({ 
    resolver: zodResolver(CreateTratamentoSchema),
    defaultValues: {
      name: '',
      description: ''
    } 
  })


  async function onSubmit(data: CreateTratamentoType) {
    try {
      setIsLoading(true)
      await api.post('appointment-type', data)

      queryClient.invalidateQueries({ queryKey: [ tratamentoKey ], type: 'all' })

      setIsLoading(false)
      toast("Tratamento criado com sucesso.")
      closeModal()
    }
    catch (err) {
      setIsLoading(false)
      toast("Ocorreu uma falha ao criar o tratamento.", {
      description: "Tente novamente mais tarde",
      style: danger
    })
    }
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do tratamento</FormLabel>
                  <Input  {...field} value={field.value} />
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
                  <Textarea  {...field} value={field.value ?? undefined} />
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