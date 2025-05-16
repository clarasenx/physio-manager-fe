import CardPacienteIndiv from '@/components/cards/CardPacienteIndiv';
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { LuCirclePlus, LuSearch } from 'react-icons/lu';

export default function Consultas() {
  const pacientes = Array(10).fill({
    nome: 'Rafaela Silva',
    telefone: '+55 69 98765-4321',
    ultimaConsulta: '12/05/2025',
    email: 'rafasilva@gmail.com',
  });

  return (
    <div className='w-fit sm:w-2xl lg:w-full h-100dvh px-8 sm:px-4 mx-auto mt-10'>
      <div className='flex justify-between items-center'>
        <p className='text-2xl text-center font-medium pb-3'>Pacientes</p>
        <div className='sm:hidden flex w-fit px-2 justify-center items-center bg-[#6A5242] rounded-lg text-white gap-1 cursor-pointer shadow'>
            <LuCirclePlus />
            <button className='h-7 text-sm text-nowrap'>Novo paciente</button>
          </div>
      </div>

      <section className='bg-white w-full h-full rounded-lg py-5 px-4 shadow'>
        <div className='w-full flex justify-center gap-2'>
          <div className='px-2 h-8 w-full flex bg-[#F6F5F2] rounded-lg items-center gap-2 shadow cursor-pointer'>
            <LuSearch className='text-[#6A5242]'/>
            <input type="text"
            placeholder="Buscar por paciente"
            className='text-sm w-[145px]'/>
          </div>
          <div className='hidden sm:flex w-fit px-2 justify-center items-center bg-[#6A5242] rounded-lg text-white gap-1 cursor-pointer shadow'>
            <LuCirclePlus />
            <button className='h-8 text-sm text-nowrap'>Novo paciente</button>
          </div>
        </div>

        <div className='w-full flex pt-6 gap-3'>
          {/* Tabela com todos os pacientes */}
          <section className='w-full hidden lg:grid grid-cols-4 overflow-auto max-h-[50dvh] lg:max-h-[70dvh]'>
            <table className="w-full col-span-4 overflow-hidden rounded-lg border border-gray-200 text-sm">
              <thead>
                <tr className="bg-[#F6F5F2] text-[#2D231C] text-left text-nowrap">
                  <th className="p-3">Nome</th>
                  <th className="p-3">Telefone</th>
                  <th className="p-3">Última consulta</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((paciente, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">{paciente.nome}</td>
                    <td className="p-3">{paciente.telefone}</td>
                    <td className="p-3">{paciente.ultimaConsulta}</td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> 
          </section>

          {/* Cards de paciente individual mobile/telas menores*/}
          <section className='w-full overflow-auto sm:max-h-[60dvh] flex flex-col gap-3 lg:hidden bg-[#F1EDE3] rounded-md p-4'>
            <CardPacienteIndiv />
            <CardPacienteIndiv />
            <CardPacienteIndiv />
            <CardPacienteIndiv />
            <CardPacienteIndiv />
          </section>
        
          <section className='hidden w-fit text-nowrap text-[#2D231C] px-4 py-3 rounded-lg bg-[#F1EDE3]'>

            <p className='font-semibold text-lg px-3 pb-2'>{pacientes[0].nome}</p>

            <div className='bg-white px-4 py-3 rounded-lg'>
              <p className='font-semibold line-clamp-1'>Telefone</p>
              <p className='line-clamp-1'>{pacientes[0].telefone}</p>
              <p className='font-semibold line-clamp-1'>Última consulta</p>
              <p className='line-clamp-1'>{pacientes[0].ultimaConsulta}</p>
              <p className='font-semibold line-clamp-1'>Email</p>
              <p className='line-clamp-1'>{pacientes[0].email}</p>
            </div>

          </section>
        </div>
      </section>
    </div>
  )
}