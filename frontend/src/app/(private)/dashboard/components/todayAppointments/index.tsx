'use client'

import CardDashboard from "@/components/cards/CardDashboard"
import { ErrorMessage } from "@/components/ErrorMessage"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboard } from "@/hooks/useDashboard"

export const TodayAppointments = () => {
  const {
    isError,
    isPending,
    isFetching,
    data: dashboard,
    refetch
  } = useDashboard()

  function Loading() {
    return (
      <div className='lex flex-col gap-3 py-4 px-3 md:px-6 w-full'>
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
        <Skeleton className="w-full mt-2 h-[90px] rounded-lg" />
      </div>
    )
  }

  return (
    <div className='bg-white flex flex-col w-full px-4 py-5 sm:p-5 rounded-lg gap-3 text-zinc-950 sm:overflow-auto sm:max-h-[60dvh] lg:max-h-[65dvh]'>
      {
        isPending ? <Loading /> : isError ? <ErrorMessage name='consultas' refetch={refetch} isLoading={isFetching} /> :
          !dashboard?.todayAppointments.data.length ? <p className="font-medium">Você ainda não tem consultas marcadas para hoje.</p> :
            dashboard?.todayAppointments.data.map((appointment) => (
              <CardDashboard key={`CardDashboard-${appointment.id}`} item={appointment} />
            ))
      }
    </div>
  )
}