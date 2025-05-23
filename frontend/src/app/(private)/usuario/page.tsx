'use client'

import { useUser } from "@/hooks/useUser";
import { UserDataCell } from "./components/cell";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserDialog } from "./components/formDialog";

const Usuario = () => {

  const user = useUser()

  if (user.isError) {
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorMessage name="dados do usuário" refetch={user.refetch} />
      </div>
    )
  }

  function Loading() {
    return (
      <>
        <Skeleton className="h-7 mt-1 w-full" />
        <Skeleton className="h-7 mt-1 w-full" />
        <Skeleton className="h-7 mt-1 mb-2 w-full" />
      </>
    )
  }

  return (
    <div className='w-full md:w-[700px] mx-auto flex flex-col gap-4 px-4 sm:px-8 pt-5'>
      <section className='flex px-4 py-3'>
        {
          user.isPending ? <Skeleton className="w-40 h-7" /> :
            <p className='leading-4'>Bem vinda, <br />
              <span className='font-semibold text-xl text-[#2D231C]'>{user.data?.name}</span>
            </p>
        }
      </section>

      <section className='bg-white flex flex-col rounded-2xl'>
        <div className='bg-primary px-4 py-2 rounded-t-2xl w-full '>
          <p className='font-medium text-lg text-center text-white'>Dados pessoais</p>
        </div>

        <section className='flex flex-col gap-2 px-4 py-2'>
          {
            user.isPending ? <Loading /> :
              <>
                <UserDataCell label="Nome" data={user.data?.name || ''} />
                <UserDataCell label="Email" data={user.data?.email || ''} />
                <UserDataCell label="CPF" data={user.data?.register || ''} />
                <UserDialog user={user.data}>
                  <Button className="w-fit mx-auto mt-2">Alterar dados</Button>
                </UserDialog>
              </>

          }
        </section>

      </section>
    </div>
  )
}

export default Usuario;