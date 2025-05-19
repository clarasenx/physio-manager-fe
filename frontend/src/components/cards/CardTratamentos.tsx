import { TratamentoType } from '@/dtos/tratamentos/tratamento.schema';
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';

const CardTratamentos = ({tratamento}: {tratamento: TratamentoType}) => {
  return (
    <div className='flex flex-col' >
      <section className='flex flex-col justify-between shadow-md rounded-lg h-full bg-[#F6F5F2]'>
        <div className='bg-[#9C7C5A] text-white rounded-t-lg px-4 py-2'>
          <p className='text-lg font-semibold tracking-wide line-clamp-2'>{tratamento.name}</p>
        </div>

        <div className='flex flex-col h-full justify-between rounded-b-lg px-4 py-3 gap-3'>
          <p>{tratamento.description}</p>
          <div className='flex justify-between'>
            <button className="bg-[#E3D4C0] hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
              <FaTrash size={14} />
            </button>
            <div className='flex gap-1'>
              <button className="bg-[#E3D4C0] hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
              <FaEye size={14} />
              </button>
              <button className="bg-[#E3D4C0] hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
                <FaPencilAlt size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CardTratamentos;