import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Combobox } from '@/components/ui/combobox'
import { CommandGroup, CommandItem } from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { danger } from "@/constants/ToastStyle"
import { ListScheduleType } from "@/dtos/schedule/list-schedule.dto"
import { UpdateScheduleSchema, UpdateScheduleType } from "@/dtos/schedule/update-schedule.dto"
import { ScheduleStatus } from "@/enum/schedule-status.enum"
import { useDebounce } from '@/hooks/useDebounce'
import { usePatient } from "@/hooks/usePatient"
import { scheduleKey } from "@/hooks/useSchedule"
import { cn } from "@/lib/utils"
import { zodResolver } from '@hookform/resolvers/zod'
import { CircularProgress } from '@mui/material'
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { format } from "date-fns"
import { pt } from 'date-fns/locale/pt'
import { CalendarIcon, Check } from "lucide-react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const ConsultaEditForm = ({
  closeModal,
  schedule
}: {
  closeModal: () => void,
  schedule: ListScheduleType
}) => {
  const queryClient = useQueryClient()
  const [time, setTime] = useState<string>(schedule.date.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' }))
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const triggerCalendarRef = useRef<HTMLButtonElement>(null)
  const [ searchPatient, setSearchPatient ] = useState<string>()
    const debouncedSearch = useDebounce(searchPatient, 500)

  const form = useForm<UpdateScheduleType>({
    resolver: zodResolver(UpdateScheduleSchema),
    defaultValues: {
      date: schedule.date,
      patientId: schedule.patientId,
      notes: schedule.notes || '',
      initialDiscomfort: schedule.initialDiscomfort || 0,
      finalDiscomfort: schedule.finalDiscomfort || 0,
    }
  })
  const patients = usePatient( { search: debouncedSearch } )

  function setHours(date: Date) {
    const auxDate = new Date(date);

    const [hours, minutes] = time.split(":").map(Number);
    auxDate.setHours(hours);
    auxDate.setMinutes(minutes);
    auxDate.setSeconds(0); // opcional, zera os segundos
    if (isNaN(auxDate.getTime())) return date
    return auxDate;
  }

  async function onSubmit(data: UpdateScheduleType, force?: boolean) {
    if (data.date) {
      data.date = setHours(data.date)
    }

    const payload: UpdateScheduleType = { ...data }

    Object.entries(data).forEach(([key, value]) => {

      if (
        schedule[key as keyof typeof schedule] !== value ||
        (
          value instanceof Date &&
          value.getTime() !== new Date(schedule[key as keyof typeof schedule] as Date).getTime()
        )
      ) {
        return;
      }
      delete payload[key as keyof typeof payload]
    });

    if(schedule.status === ScheduleStatus.SCHEDULED) {
      delete payload.finalDiscomfort
      delete payload.initialDiscomfort
    }

    const params = force ? { force } : {}

    try {
      setIsLoading(true)
      await api.patch(`schedule/${schedule.id}`, payload, { params })

      queryClient.invalidateQueries({ queryKey: [scheduleKey], type: 'all' })

      setIsLoading(false)
      toast("Consulta editada com sucesso.")
      closeModal()
    }
    catch (err) {
      setIsLoading(false)
      if (!(err instanceof AxiosError)) {
        toast("Ocorreu uma falha ao editar a consulta.", {
          description: "Tente novamente mais tarde",
          style: danger
        })
        return
      }

      if (err.status === 409) {
        if (err.response?.data.code === 'EXACT_CONFLICT') {
          toast("Existe uma consulta no horário definido.", {
            className: 'toast-danger bg-red-500',
            style: danger
          })
          return
        }
        setOpenDialog(true)
        return
      }
      toast("Ocorreu uma falha ao editar a consulta.", {
        description: "Tente novamente mais tarde",
        style: danger
      })
    }
  }

  return (
    <div className="w-full">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
          <DialogHeader>
            <DialogTitle>Atenção</DialogTitle>
          </DialogHeader>
          Existe uma ou mais consultas cadastradas perto do intervalo de tempo do horario definido, tem certeza que deseja salvar esta data?
          <DialogFooter>
            <Button variant={'outline'}>
              Alterar Horario
            </Button>
            <Button variant={'destructive'} onClick={() => onSubmit(form.getValues(), true)}>
              Criar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => onSubmit(data, false))}>
          <div className="xl:w-9/12 mb-4">
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paciente</FormLabel>
                  <Combobox
                    onSearch={setSearchPatient}
                    className='font-normal border-black'
                    searchPlaceholder="Pesquise um paciente..."
                    placheholder={field.value
                      ? patients.data?.data.find((patient) => patient.id === field.value)?.name || schedule.patient?.name
                      : 'Selecione um paciente'}
                    listItems={(close) =>
                      <CommandGroup>
                        {patients.isPending ?
                          <div className='w-full flex justify-center py-3'>
                            <CircularProgress />
                          </div>
                          :
                          !patients.data?.data.length ? <p className='text-sm text-center'>Sem pacientes encontrados</p> :
                            !patients.isError &&
                            patients.data.data.map((patient, index) => (
                              <CommandItem
                                key={`patient-${index}`}
                                value={String(patient.id)}
                                onSelect={() => {
                                  close()
                                  field.onChange(patient.id)
                                }}
                              >
                                {patient.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value === patient.id ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                      </CommandGroup>
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="flex gap-10"> */}
          <div className="grid grid-cols-7 grid-row-2 mb-4 gap-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          ref={triggerCalendarRef}
                          className={cn(
                            "pl-3 text-left font-normal border-black mb-2",
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
                        onSelect={(date) => {
                          field.onChange(date)
                          setTimeout(() => triggerCalendarRef.current?.click(), 0)
                        }}
                        disabled={(date) => {
                          if (schedule.status !== ScheduleStatus.SCHEDULED) return false
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          return (date < today)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="col-span-3 col-start-5">
              <FormLabel>Hora</FormLabel>
              <FormControl>
                <Input className="border-black bg-white" type="time" placeholder="00:00" value={time} onChange={event => setTime(event.target.value)} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>

            {
              schedule.status !== ScheduleStatus.SCHEDULED ?
                <>
                  <FormField
                    control={form.control}
                    name="initialDiscomfort"
                    render={({ field }) => (
                      <FormItem className="col-span-3 ">
                        <FormLabel>Dor Inicial</FormLabel>
                        <Input
                          className="bg-white border-black"
                          type="number"
                          placeholder="De 1 a 10"
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="finalDiscomfort"
                    render={({ field }) => (
                      <FormItem className="col-span-3 col-start-5">
                        <FormLabel>Dor Final</FormLabel>
                        <Input className="bg-white border-black" type="number" placeholder="De 1 a 10" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </> : <></>
            }

          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Notas</FormLabel>
                <Textarea className="bg-white border-black" placeholder="Escreva suas anotações aqui" {...field} value={field.value ?? undefined} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant={'secondary'} onClick={() => closeModal()}>Cancelar</Button>
            <Button type="submit" isLoading={isLoading}>Salvar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}