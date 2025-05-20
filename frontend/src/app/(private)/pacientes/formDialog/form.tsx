import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from '@/components/ui/textarea'
import { danger } from "@/constants/ToastStyle"
import { CreatePatientSchema, CreatePatientType } from "@/dtos/patient/create-patient.dto"
import { PatientType } from "@/dtos/patient/patient.schema"
import { patientKey } from "@/hooks/usePatient"
import { cn } from "@/lib/utils"

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useHookFormMask } from "use-mask-input"

type PatientFormProps = {
  closeModal: () => void;
  patient?: PatientType; // ou o tipo completo vindo do backend
};

export const PatientForm = ({ closeModal, patient }: PatientFormProps) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreatePatientType>({
    resolver: zodResolver(CreatePatientSchema),
    defaultValues: {
      name: patient?.name || '',
      birthday: patient?.birthday || undefined,
      email: patient?.email || '',
      phone: patient?.phone || '',
    }
  });

  const registerWithMask = useHookFormMask(form.register);

  async function onSubmit(data: CreatePatientType) {

    const payload = { ...data }

    if (patient) {
      Object.entries(data).forEach(([key, value]) => {

        if (
          patient[key as keyof typeof patient] !== value ||
          (
            value instanceof Date &&
            value.getTime() !== new Date(patient[key as keyof typeof patient] as Date).getTime()
          )
        ) {
          return;
        }
        delete payload[key as keyof typeof payload]
      });
    }

    try {
      setIsLoading(true);

      if (patient?.id) {
        // Edição
        await api.patch(`patient/${patient.id}`, payload);
        toast("Paciente atualizado com sucesso.");
      } else {
        // Criação
        await api.post('patient', payload);
        toast("Paciente criado com sucesso.");
      }

      queryClient.invalidateQueries({ queryKey: [patientKey], type: 'all' });
      closeModal();
    } catch {
      toast("Ocorreu uma falha ao salvar o paciente.", {
        description: "Tente novamente mais tarde",
        style: danger
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="mb-4 flex w-full gap-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <Input className="border-black bg-white" placeholder="Digite o nome do paciente" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <Input className="border-black bg-white" placeholder="Digite o email do paciente" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-8/12 mb-4 flex gap-10">
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left w-full font-normal border-black",
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className="flex-1">
              <FormLabel>Telefone</FormLabel>
              <Input className="border-black bg-white" placeholder="00 00000-0000" {...registerWithMask('phone', ['99 99999-9999'], { required: true, autoUnmask: true, })} />
              <FormMessage />
            </FormItem>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button type="submit" isLoading={isLoading}>
              {patient?.id ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
