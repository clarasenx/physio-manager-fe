import { ErrorMessage } from "@/components/ErrorMessage";
import { Paginator } from "@/components/Paginator";
import { AppointmentStatus } from "@/enum/appointment-status.enum";
import { useAppointment } from "@/hooks/useAppointment";
import { getFormatedDate } from "@/utils/getFormatedDate";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

export const ListAppointmentByPatient = ({
  patientId,
  isMobile = false
}: {
  patientId: number
  isMobile?: boolean
}) => {


  const [page, setPage] = useState<number>(1)
  const [activeToggleInicial, setActiveToggleInicial] = useState(1);
  const toggleInicial = [
    { id: 1, label: "Agendadas" },
    { id: 2, label: "Finalizadas" },
  ]

  const status = activeToggleInicial === 1
    ? AppointmentStatus.SCHEDULED
    : AppointmentStatus.COMPLETED
  const appointment = useAppointment({ patientId, status, perPage: 4, page })

  return (
    <div className='flex flex-col items-center justify-center py-3 gap-3'>
      <div className="relative inline-flex bg-white rounded-full p-1">
        {/* Indicador deslizante */}
        <div
          className="absolute top-1 left-1 h-7 w-25 rounded-full bg-[#9C7C5A] transition-all duration-300"
          style={{
            transform: `translateX(${(activeToggleInicial - 1) * 99}px)`
          }}
        ></div>

        {toggleInicial.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveToggleInicial(item.id)}
            className={`relative z-10 w-25 h-7 text-sm flex items-center justify-center rounded-full transition-all duration-300 font-medium ${activeToggleInicial === item.id ? 'text-white' : 'text-[#2D231C]'
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className='border flex flex-col w-full rounded-lg'>
        <div className='grid grid-cols-2 gap-8 px-2 sm:px-4 py-2 bg-[#9C7C5A] text-white rounded-t-lg'>
          <p>Tratamento</p>
          <p>Data</p>
        </div>
        <section className={`px-2 lg:w-[250px] xl:w-[300px] 2xl:w-[350px] sm:px-4 pb-2 text-sm rounded-b-lg ${!isMobile ? 'bg-white' : 'bg-[#F1EDE3]'} `}>
          {
            appointment.isLoading ?
              <div className="w-full flex py-3 justify-center items-center">
                <CircularProgress />
              </div>
              :
              appointment.isError ? <ErrorMessage name="consultas" refetch={appointment.refetch} isLoading={appointment.isFetching} /> :
                !appointment.data?.data.length ? <p className="px-5 py-3 text-center">Este paciente não possui <br /> consultas {toggleInicial.find(t => t.id === activeToggleInicial)?.label}</p> :
                  <>
                    {
                      appointment.data.data.map((appointment, index) => (
                        <div key={`appointment-patient-${index}${isMobile}`} className='grid grid-cols-2 items-center pt-3 gap-6'>
                          <p className='text-wrap'>{appointment.appointmentType?.name || 'Indefinido'}</p>
                          <p>{getFormatedDate(appointment.date)}</p>
                        </div>
                      ))
                    }
                    <div className='w-full flex items-end mt-5'>
                      <Paginator
                        page={page}
                        setPage={setPage}
                        hasMore={appointment.data?.meta.hasMore || false}
                      />
                    </div>
                  </>
          }
        </section>
      </div>
    </div>
  )
}