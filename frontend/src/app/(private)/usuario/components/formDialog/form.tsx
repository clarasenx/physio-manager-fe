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
import { danger } from "@/constants/ToastStyle"
import { ListUserType } from "@/dtos/user/list-user.dto"
import { UpdateUserSchema, UpdateUserType } from "@/dtos/user/update-user.dto"
import { userKey } from "@/hooks/useUser"

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useHookFormMask } from "use-mask-input"

type UserFormProps = {
  closeModal: () => void;
  user: ListUserType; // ou o tipo completo vindo do backend
};

export const UserForm = ({ closeModal, user }: UserFormProps) => {
  const queryClient = useQueryClient();
  const [ isLoading, setIsLoading ] = useState(false);

  const form = useForm<UpdateUserType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      register: user?.register || '',
    }
  });

  const registerWithMask = useHookFormMask(form.register);

  async function onSubmit(data: UpdateUserType) {

    const payload = { ...data }

    Object.entries(data).forEach(([ key, value ]) => {

      if (user[ key as keyof typeof user ] !== value) {
        return;
      }
      delete payload[ key as keyof typeof payload ]
    });

    if (Object.keys(payload).length === 0) {
      closeModal();
      return
    }

    try {
      setIsLoading(true);

      await api.patch(`user/${user.id}`, payload);
      toast("Paciente atualizado com sucesso.");

      queryClient.invalidateQueries({ queryKey: [ userKey ], type: 'all' });
      closeModal();
    } catch {
      toast("Ocorreu uma falha ao salvar.", {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          <FormItem className="flex-1">
            <FormLabel>CPF</FormLabel>
            <Input
              className="border-black bg-white"
              {...registerWithMask('register', [ '999.999.999-99' ], {
                required: false,
                autoUnmask: true,
                setValueAs: (val) => {
                  // Trata valores "mascarados" vazios como null
                  return val?.trim() === '' || val?.includes('_') ? null : val;
                },
              })}
            />
            <FormMessage />
          </FormItem>
          <div className="flex justify-end items-center gap-4 mt-6">
            <Link href={'/recuperar-senha'} className='w-fit my-3 mr-auto hover:cursor-pointer text-primary text-center'>
              <Button variant={'outline'}>
                Alterar Senha
              </Button>
            </Link>
            <Button type="submit" isLoading={isLoading}>
              {user?.id ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
