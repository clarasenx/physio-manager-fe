import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CreateScheduleSchema, CreateScheduleType } from "@/dtos/schedule/create-schedule.dto"
import { usePatient } from "@/hooks/usePatient"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { pt } from 'date-fns/locale/pt';
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod';
import api from "@/api/axios"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { scheduleKey } from "@/hooks/useSchedule"

export const ConsutasCreateForm = ({
  closeModal,
  date
}: {
  closeModal: ()=>void,
  date?: Date
}) => {
  const queryClient = useQueryClient()
  const [time, setTime] = useState<string>('00:00')


  const form = useForm<CreateScheduleType>({
    resolver: zodResolver(CreateScheduleSchema),
    defaultValues: {
      date: date
    }
  })
  const patients = usePatient()

  function setHours(date: Date) {
    const auxDate = new Date(date);

    const [hours, minutes] = time.split(":").map(Number);
    auxDate.setHours(hours);
    auxDate.setMinutes(minutes);
    auxDate.setSeconds(0); // opcional, zera os segundos
    if (isNaN(auxDate.getTime())) return date
    return auxDate;
  }

  async function onSubmit(data: CreateScheduleType) {
    data.date = setHours(data.date)
    console.log(data);
    try {
      await api.post('schedule', data)

      queryClient.invalidateQueries({ queryKey: [scheduleKey], type: 'all' })

      toast("Consulta criada com sucesso.")
      closeModal()
    }
    catch {
      toast("Ocorreu uma falha ao salvar a consulta.", {
        description: "Tente novamente mais tarde"
      })
    }
  }

  return (
    <div className="w-full">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="xl:w-9/12 mb-4">
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paciente</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))}>
                    <FormControl>
                      <SelectTrigger className="w-full bg-white border-black">
                        <SelectValue placeholder="Selecione um paciente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        !patients.isPending && !patients.isError &&
                        patients.data.map((patient, index) => (
                          <SelectItem key={`patient-${index}`} value={String(patient.id)}>{patient.name}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-10">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal border-black",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy", { locale: pt })
                          ) : (
                            <span>00/00/0000</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          return date < today
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="flex-1">
              <FormLabel>Hora</FormLabel>
              <FormControl>
                <Input className="border-black bg-white" type="time" placeholder="00:00" value={time} onChange={event => setTime(event.target.value)} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant={'secondary'} onClick={()=>closeModal()}>Cancelar</Button>
            <Button type="submit">Criar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}