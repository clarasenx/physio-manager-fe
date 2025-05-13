'use client';
import { useState } from 'react';
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';

const CardPacienteIndiv = () => {
  const [buttonStatus, setButtonStatus] = useState(false); // Estado para controlar a exibição do botão "Ver mais"
  return (
    <div className='flex flex-col px-4 py-2 border rounded-xl shadow-md bg-white'>
      <section className='flex flex-col py-3'>
        <div className='flex items-center gap-2'>
          <p className='text-[#82654C] font-semibold '>Nome:</p>
          <p>rafaela silva</p>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-[#82654C] font-semibold'>Nascimento:</p>
          <p>12/03/13</p>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-[#82654C] font-semibold'>Telefone:</p>
          <p>999999-9999</p>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-[#82654C] font-semibold'>Última consulta:</p>
          <p>23/05/25</p>
        </div>
      </section>
      
      <section className='flex items-center justify-between'>
        <button className='text-[#82654C] hover:text-[#6B4A2E] hover:cursor-pointer'
          onClick={() => setButtonStatus(!buttonStatus)}>
          Ver mais
        </button>
        <div className="flex justify-end gap-2">
          <button className="bg-[#E3D4C0] hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
            <FaTrash size={14} />
          </button>
          <button className="bg-[#E3D4C0] hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
            <FaEye size={14} />
          </button>
          <button className="bg-[#E3D4C0] hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
            <FaPencilAlt size={14} />
          </button>
        </div>
      </section>

      {buttonStatus && (
        <div>
          
        </div>
      )}
    </div>
  )
}

export default CardPacienteIndiv;