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
import { zodResolver } from '@hookform/resolvers/zod';
import api from "@/api/axios"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { scheduleKey } from "@/hooks/useSchedule"
import { danger } from "@/constants/ToastStyle"
import { StartScheduleSchema } from "@/dtos/schedule/start-schedule.dto"
import { Textarea } from "@/components/ui/textarea"
import { actionTypeView } from "@/constants/actionTypeView";
import { ConcludeScheduleSchema } from "@/dtos/schedule/conclude-schedule.dto";
import { z } from "zod";
import { ListScheduleType } from "@/dtos/schedule/list-schedule.dto";
import { isScheduleStarted } from "@/utils/isScheduleStarted";
import { useState } from "react";
import { GoPencil } from "react-icons/go";

export const ConsultaActionForm = ({
  closeModal,
  schedule,
}: {
  closeModal: () => void,
  schedule: ListScheduleType,
}) => {
  const actionType: 'START' | 'CONCLUDE' = isScheduleStarted(schedule) ?
    'CONCLUDE' : 'START'

  const [disbled, setDisabled] = useState(actionType === 'CONCLUDE')
  const [isLoading, setIsLoading] = useState(false)

  const schema = z.union([ConcludeScheduleSchema, StartScheduleSchema])
  type SchemaType = typeof schema extends z.ZodTypeAny ? z.infer<typeof schema> : never

  const queryClient = useQueryClient()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialDiscomfort: schedule.initialDiscomfort || 0,
      finalDiscomfort: 0,
      notes: schedule.notes || ''
    } as Partial<SchemaType>
  })

  async function onSubmit(data: SchemaType) {

    const endPoint = actionType.toLowerCase()

    try {
      setIsLoading(true)
      await api.patch(`schedule/${schedule.id}/${endPoint}`, data)
      
      queryClient.invalidateQueries({ queryKey: [scheduleKey], type: 'all' })
      
      const message = actionType === 'CONCLUDE' ? "Consulta finalizada com sucesso." : "Consulta iniciada com sucesso."
      
      setIsLoading(false)
      toast(message)
      closeModal()
    }
    catch {
      setIsLoading(false)
      toast("Ocorreu uma falha ao salvar a consulta.", {
        description: "Tente novamente mais tarde",
        style: danger
      })
    }
  }


  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-7 mb-4">
            <FormField
              control={form.control}
              name="initialDiscomfort"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Dor Inicial</FormLabel>
                  <Input
                    type="number"
                    placeholder="De 1 a 10"
                    disabled={disbled}
                    rightIcon={disbled ?
                      <div className="cursor-pointer" onClick={() => setDisabled(false)}>
                        <GoPencil />
                      </div> : null}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {actionType === 'CONCLUDE' && (
              <FormField
                control={form.control}
                name="finalDiscomfort"
                render={({ field }) => (
                  <FormItem className="col-span-3 col-start-5">
                    <FormLabel>Dor Final</FormLabel>
                    <Input type="number" placeholder="De 1 a 10" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Notas</FormLabel>
                <Textarea placeholder="Escreva suas notas aqui" {...field} value={field.value ?? undefined} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant={'secondary'} onClick={() => closeModal()}>Cancelar</Button>
            <Button type="submit" isLoading={isLoading}>{actionTypeView[actionType]}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}