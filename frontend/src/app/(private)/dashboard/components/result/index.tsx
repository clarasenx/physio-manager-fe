'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { useDashboard } from "@/hooks/useDashboard"
import { IDashboard } from "@/interfaces/IDashboard"

export const DashboardResult = ({
  dataKey
}: {
  dataKey: keyof IDashboard
}) => {
  const {
    isError,
    isPending,
    data: dashboard
  } = useDashboard()

  if (isError) return <>-</>
  if (isPending) return <Skeleton className="h-5 w-16 my-4" />  
  

  return (
    <p className='text-3xl leading-9 sm:text-4xl pt-2 font-semibold'>
      {
        dataKey === 'todaySchedules' ?
          <>{dashboard.todaySchedules.length}</> :
          <>{dashboard[dataKey as keyof typeof dashboard]}</>
      }
    </p>
  )
}