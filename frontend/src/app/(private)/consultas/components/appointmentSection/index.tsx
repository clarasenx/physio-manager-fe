import CardConsulta from "@/components/cards/Consultas/CardConsultas";
import { AppointmentType } from "@/dtos/appointment/appointment.schema";

export const AppointmentSection = ({ title, items }: { title: string, items: AppointmentType[] }) => {
  return (
    <section className='flex flex-col gap-1 sm:gap-3 py-2 sm:py-4 px-3 md:px-6 w-full'>
      <p className='text-lg font-medium'>{title}</p>
      <div className='flex flex-col gap-4'>
        {
          !items.length ? <p>Nenhuma consulta agendada {title.toLowerCase()}</p> :
            items.map((item) => (
              <CardConsulta key={item.id} item={item} />
            ))
        }
      </div>
    </section>
  )
}