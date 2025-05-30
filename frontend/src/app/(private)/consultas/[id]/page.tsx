'use client'

import api from "@/api/axios"
import { ErrorMessage } from "@/components/ErrorMessage"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { StatusView } from "@/constants/StatusView"
import { danger } from "@/constants/ToastStyle"
import { UpdateAppointmentType } from "@/dtos/appointment/update-appointment.dto"
import { appointmentKey, useAppointmentById } from "@/hooks/useAppointment"
import { formatPhone } from "@/utils/formatPhone"
import { getFormatedDate } from "@/utils/getFormatedDate"
import { isAppointmentStarted } from "@/utils/isAppointmentStarted"
import { CircularProgress } from "@mui/material"
import { ArrowLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ConsultaActionDialog } from "../components/actionDialog"
import { useQueryClient } from "@tanstack/react-query"
import { appointmentInfiniteKey } from "@/hooks/useInfinityAppointment"

export default function Nota() {
  const params = useParams()
  const id = useMemo(() => Number(params.id), [params.id]) // garante que é um número
  const route = useRouter()
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const getString = (notes?: string | null) => {
    if (!notes) return ""
    return notes
  }

  const {
    data: appointment,
    isPending,
    isError,
    isFetching,
    refetch
  } = useAppointmentById(id)

  const isStarted = isAppointmentStarted(appointment)

  const form = useForm<UpdateAppointmentType>({
    defaultValues: {
      notes: appointment?.notes || ''
    }
  })

  function handleBack() {
    if (form.getValues('notes') !== getString(appointment?.notes)) {
      setOpenDialog(true)
    } else {
      route.back()
    }
  }

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      if (form.getValues('notes') !== getString(appointment?.notes)) {
        event.preventDefault()
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [appointment?.notes, form]);

  async function onSubmit(data: UpdateAppointmentType) {
    if (form.getValues('notes') === getString(appointment?.notes)) return

    await updateNote(data.notes || '')
  }

  async function updateNote(notes: string, back?: boolean) {
    try {
      setIsLoading(true)
      await api.patch(`appointment/${id}`, { notes })
      toast('Anotação salva com sucesso!')
      queryClient.refetchQueries({ queryKey: [appointmentKey] })
      queryClient.refetchQueries({ queryKey: [appointmentInfiniteKey] })
      if (back) {
        route.back()
      }
    }
    catch {
      toast('Ocorreu um erro ao salvar suas anotações', { style: danger })
    }
    finally {
      setIsLoading(false)
      if (openDialog) {
        setIsLoading(false)
      }
    }
  }

  if (isPending) {
    return (
      <div className='w-full h-[calc(100dvh-200px)] lg:h-dvh flex jusitfy-center items-center'>
        <CircularProgress className='mx-auto' size={60} />
      </div>
    )
  }
  if (isError) {
    return (
      <ErrorMessage name="informações da consulta" refetch={refetch} isLoading={isFetching} />
    )
  }

  return (
    <div className='w-full px-4 sm:px-8'>
      <button className="self-start mb-2 mt-4 sm:mt-10 text-primary cursor-pointer flex items-center gap-1" onClick={handleBack}>
        <ArrowLeft size={25} />
        <span className='text-lg font-medium'>Voltar</span>
      </button>
      <section className='border-x rounded-t-lg'>
        <div className='flex flex-col sm:flex-row w-full h-full items-center bg-[#9C7C5A] rounded-t-lg border-t py-2 px-4'>
          <p className='sm:text-lg lg:text-xl font-semibold text-white'>
            {appointment.patient?.name}
          </p>
        </div>

        <section className='bg-white px-4 py-2 grid xs:grid-cols-2 md:grid-cols-6 gap-2 md:gap-2'>
          <div className='flex flex-col sm:flex-row w-full h-full sm:gap-2 items-start sm:items-center col-span-1 md:col-span-2'>
            <p className='font-medium text-nowrap sm:text-lg'>Tratamento:</p>
            <p>{appointment.appointmentType?.name || 'Indefinido'}</p>
          </div>

          <div className='flex flex-col sm:flex-row w-full h-full sm:gap-2  items-start sm:items-center col-span-1 md:col-span-2'>
            <p className='font-medium sm:text-lg'>Data da consulta:</p>
            <p>{getFormatedDate(appointment.date, true)}</p>
          </div>

          {
            typeof appointment.initialDiscomfort === 'number' ?
              <div className='flex flex-col sm:flex-row w-full h-full sm:gap-2 items-start sm:items-center col-span-1 md:col-span-2'>
                <p className='font-medium text-nowrap sm:text-lg'>Dor Inicial:</p>
                <p>{appointment.initialDiscomfort}</p>
              </div> : <div className="col-span-1 md:col-span-2"></div>
          }

          <div className='flex flex-col sm:flex-row w-full h-full sm:gap-2  items-start sm:items-center col-span-1 md:col-span-2'>
            <p className='font-medium sm:text-lg'>Telefone:</p>
            <p>{formatPhone(appointment.patient?.phone)}</p>
          </div>

          <div className='flex flex-col sm:flex-row w-full h-full sm:gap-2 items-start sm:items-center col-span-1 md:col-span-2'>
            <p className='font-medium text-nowrap sm:text-lg'>Status:</p>
            <p>{StatusView[appointment.status]} {isStarted ? ' (Iniciada)' : ''}</p>
          </div>

          {
            typeof appointment.finalDiscomfort === 'number' ?
              <div className='flex flex-col sm:flex-row w-full h-full sm:gap-2 items-start sm:items-center col-span-1 md:col-span-2'>
                <p className='font-medium text-nowrap sm:text-lg'>Dor Final:</p>
                <p>{appointment.finalDiscomfort}</p>
              </div> :
              <div className="col-span-1 md:col-span-2"></div>
          }
        </section>
      </section>

      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <section
          className='flex bg-white w-full max-h-[55vh] lg:max-h-4/6 rounded-b-lg overflow-auto sm:py-5 p-2 sm:px-4 border'>
          <Textarea
            placeholder='Escreva suas anotações aqui!'
            className='w-full min-h-[450px] lg:min-h-[550px] h-full'
            {...form.register('notes')}
          />
        </section>
        <div className="mt-2 w-full flex items-center justify-between">
          <p className="text-sm">Registrada em {getFormatedDate(appointment.createdAt, true)}</p>
          <div>
            {
              isStarted ?
                <ConsultaActionDialog appointment={appointment} notes={form.getValues('notes') || undefined}>
                  <Button type="button" variant={'outline'}>Finalizar Consulta</Button>
                </ConsultaActionDialog> : <></>
            }
            <Button type="submit" className="ml-4 px-10" isLoading={isLoading}>Salvar</Button>
          </div>
        </div>
      </form>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] bg-[#F6F5F2]">
          <DialogHeader>
            <DialogTitle>Atenção</DialogTitle>
          </DialogHeader>
          É possível que as alterações feitas não sejam salvas.
          <DialogFooter>
            <Button variant={'destructive'} onClick={() => route.back()}>
              Não Salvar
            </Button>
            <Button variant={'outline'} onClick={() => updateNote(form.getValues('notes') || '', true)}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}