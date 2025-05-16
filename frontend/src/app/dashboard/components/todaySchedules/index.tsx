'use client'

import CardDashboard from "@/components/cards/CardDashboard"
import { ErrorMessage } from "@/components/ErrorMessage"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboard } from "@/hooks/useDashboard"

export const TodaySchedules = () => {
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
    <div className='bg-white flex flex-col w-full px-2 py-5 sm:p-5 rounded-lg gap-3 text-zinc-950 sm:overflow-auto sm:max-h-[60dvh] lg:max-h-[65dvh]'>
      {
        isPending ? <Loading /> : isError ? <ErrorMessage refetch={refetch} isLoading={isFetching} /> :
          !dashboard?.todaySchedules.length ? <p className="font-medium">Você ainda não tem consultas marcadas para hoje.</p> :
            dashboard?.todaySchedules.map((schedule) => (
              <CardDashboard key={`CardDashboard-${schedule.id}`} item={schedule} />
            ))
      }
    </div>
  )
}