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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { danger } from "@/constants/ToastStyle"
import { CreateScheduleSchema, CreateScheduleType } from "@/dtos/schedule/create-schedule.dto"
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
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const ConsultaCreateForm = ({
  closeModal,
  date
}: {
  closeModal: () => void,
  date?: Date
}) => {
  const queryClient = useQueryClient()
  const [ time, setTime ] = useState<string>('00:00')
  const [ openDialog, setOpenDialog ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ searchPatient, setSearchPatient ] = useState<string>()
  const debouncedSearch = useDebounce(searchPatient, 500)

  const form = useForm<CreateScheduleType>({
    resolver: zodResolver(CreateScheduleSchema),
    defaultValues: {
      date: date
    }
  })
  const patients = usePatient({ search: debouncedSearch })

  function setHours(date: Date) {
    const auxDate = new Date(date);

    const [ hours, minutes ] = time.split(":").map(Number);
    auxDate.setHours(hours);
    auxDate.setMinutes(minutes);
    auxDate.setSeconds(0); // opcional, zera os segundos
    if (isNaN(auxDate.getTime())) return date
    return auxDate;
  }

  async function onSubmit(data: CreateScheduleType, force?: boolean) {
    data.date = setHours(data.date)
    const params = force ? { force } : {}
    try {
      setIsLoading(true)
      await api.post('schedule', data, { params })

      queryClient.invalidateQueries({ queryKey: [ scheduleKey ], type: 'all' })

      setIsLoading(false)
      toast("Consulta criada com sucesso.")
      closeModal()
    }
    catch (err) {
      setIsLoading(false)
      if (!(err instanceof AxiosError)) {
        toast("Ocorreu uma falha ao criar a consulta.", {
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
      toast("Ocorreu uma falha ao criar a consulta.", {
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
          Existe uma ou mais consultas cadastradas perto do intervalo de tempo do horario definido, tem certeza que deseja criar a consulta?
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
                      ? patients.data?.data.find((patient) => patient.id === field.value)?.name
                      : 'Selecione um paciente'}
                    children={(close) =>
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
            <Button type="button" variant={'secondary'} onClick={() => closeModal()}>Cancelar</Button>
            <Button type="submit" isLoading={isLoading}>Criar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

