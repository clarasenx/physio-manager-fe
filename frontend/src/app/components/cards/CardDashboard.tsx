import { HiDotsVertical } from 'react-icons/hi';

interface DashboardData {
  id: number;
  name: string;
  treatment: string;
  time: string;
  status: string;
}

interface DashboardDataProps {
  item: DashboardData;
}

const CardDashboard = ({item}: DashboardDataProps) => {
  return (
    <section className='bg-[#F1EDE3] flex flex-col rounded-lg p-4 md:px-5 w-[260px] md:flex-row md:w-full'>
      <div className='flex justify-between md items-center pb-2 md:pb-0 md:h-full md:border-r-2 border-[#6B4A2E] lg:justify-center md:mr-6 lg:mr-10 md:w-2/8 md:pr-2'>
        <p className='md:w-full font-medium md:text-lg lg:text-xl md:font-semibold md:leading-5 md:text-center'>{item.time}</p>
        <button className='md:hidden'><HiDotsVertical/></button>
      </div>
      <div className='py-2 md:p-4 md:w-2/8'>
        <p className='text-lg leading-4 font-semibold'>{item.name}</p>
        <p className='md:text-sm'>{item.treatment}</p>
      </div>
      <div className='md:flex md:justify-between md:items-center md:w-4/8'>
        <p className={`px-3 py-1 justify-self-end max-w-28 rounded-full text-sm text-white font-medium w-[120px] text-center ${item.status === "Concluída" ? "bg-green-800" : item.status === "Pendente" ? "bg-amber-600" : item.status === "Cancelada" ? "bg-red-800" : ''}`}>{item.status}</p>
        <button className='hidden md:flex bg-[#6A5242] text-white hover:cursor-pointer px-8 py-1 rounded-lg text-sm'>Editar</button>
      </div>
    </section>
  )
}

export default CardDashboard;