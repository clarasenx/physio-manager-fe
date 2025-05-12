import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';

const CardTratamentos = () => {
  return (
    <div className='flex flex-col'>
      <section className='shadow-md rounded-lg '>
        <div className='bg-[#9C7C5A] text-white rounded-t-lg px-4 py-2'>
          <p className='text-lg font-semibold tracking-wide line-clamp-2'>Liberaçao Miofascial</p>
          <p className='text-sm font-medium'>Duraçao: 55 min</p>
        </div>

        <div className='flex flex-col bg-[#F6F5F2] rounded-b-lg px-4 py-3 gap-3'>
          <p>Técnica de massagem terapêutica que trabalha na liberação das fáscias musculares para redução de dores e aumento da mobilidade.</p>
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