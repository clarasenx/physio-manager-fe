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
import { TratamentoType } from '@/dtos/tratamentos/tratamento.schema'
import { tratamentoKey } from '@/hooks/useTratamento'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type TratamentoFormProps = {
  closeModal: () => void;
  tratamento?: TratamentoType; // ou o tipo completo vindo do backend
};

export const TratamentoForm = ({ closeModal, tratamento }: TratamentoFormProps) => {
  const queryClient = useQueryClient();
  const [ isLoading, setIsLoading ] = useState(false);

  const form = useForm<CreateTratamentoType>({
    resolver: zodResolver(CreateTratamentoSchema),
    defaultValues: {
      name: tratamento?.name ?? '',
      description: tratamento?.description ?? ''
    }
  });

  async function onSubmit(data: CreateTratamentoType) {
    try {
      setIsLoading(true);

      if (tratamento?.id) {
        // Edição
        await api.patch(`appointment-type/${tratamento.id}`, data);
        toast("Tratamento atualizado com sucesso.");
      } else {
        // Criação
        await api.post('appointment-type', data);
        toast("Tratamento criado com sucesso.");
      }

      queryClient.refetchQueries({ queryKey: [ tratamentoKey ]});
      closeModal();
    } catch {
      toast("Ocorreu uma falha ao salvar o tratamento.", {
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do tratamento</FormLabel>
                  <Input {...field} value={field.value} />
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
                  <Textarea {...field} value={field.value ?? undefined} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end mt-6">
            <Button type="submit" isLoading={isLoading}>
              {tratamento?.id ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
