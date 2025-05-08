'use client'
import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { HiDotsVertical } from 'react-icons/hi';
import { HiClock } from 'react-icons/hi2';
import { LuList } from 'react-icons/lu';
import CardConsulta from './../components/cards/CardConsultas';
import { Scheduler } from '../components/scheduler';


export default function Consultas() {

  const [activeToggleInicial, setActiveToggleInicial] = useState(1);
  const toggleInicial = [
    { id: 1, label: "Consultas" },
    { id: 2, label: "Calendário" },
  ]

  const [activeToggleConsultas, setActiveToggleConsultas] = useState(1);
  const toggleConsultas = [
    { id: 1, label: "Agendadas" },
    { id: 2, label: "Concluídas" },
    { id: 3, label: "Canceladas" },
  ]

  const consultas = [
    { id: 1, tratamento: "Liberação miofascials gsg", horário: "09:30 - 10:30", paciente: "Andressa Andrade", data: { diaMes: "20", diaSemana: "Seg" }, status: "concluida" },
    { id: 2, tratamento: "Liberação miofascial", horário: "11:30 - 12:30", paciente: "Ana Andrade", data: { diaMes: "20", diaSemana: "Seg" }, status: "concluida" },
    { id: 3, tratamento: "Liberação miofascial", horário: "14:30 - 15:30", paciente: "Ana Frotasgsgsg ggsgsgs", data: { diaMes: "20", diaSemana: "Seg" }, status: "concluida" },
    { id: 4, tratamento: "Liberação miofascial", horário: "11:30 - 12:30", paciente: "Ana Andrade", data: { diaMes: "20", diaSemana: "Seg" }, status: "concluida" },
    { id: 5, tratamento: "Liberação miofascial", horário: "14:30 - 15:30", paciente: "Ana Frotasgsgsg ggsgsgs", data: { diaMes: "20", diaSemana: "Seg" }, status: "concluida" }
  ]
  return (
    <div className='w-full'>
      {/* toggle Consultas/Calendario */}
      <section className='flex justify-center px-4 mt-10'>
        <div className="relative inline-flex bg-white rounded-full p-1">
          {/* Indicador deslizante */}
          <div
            className="absolute top-1 left-1 h-7 w-24 rounded-full bg-[#6B4A2E] transition-all duration-300"
            style={{
              transform: `translateX(${(activeToggleInicial - 1) * 95}px)`
            }}
          ></div>

          {toggleInicial.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveToggleInicial(item.id)}
              className={`relative z-10 w-24 h-7 text-sm flex items-center justify-center rounded-full transition-all duration-300 font-medium ${activeToggleInicial === item.id ? 'text-white' : 'text-[#2D231C]'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* Seção consultas */}
      <section className='flex flex-col gap-3 px-7 py-4 '>
        <p className='text-2xl text-center font-medium'>Consultas</p>

        <div className='bg-white w-full rounded-2xl py-4 flex flex-col items-center justify-center'>

          {
            activeToggleInicial === 1 ? (
              <>
                {/* toggle consultas agendadas/concluidas/canceladas */}
                <div className="relative inline-flex bg-[#F7F3EB] rounded-full p-1">
                  {/* Indicador deslizante */}
                  <div
                    className="absolute top-1 left-1 h-7 w-24 rounded-full bg-[#6B4A2E] transition-all duration-300"
                    style={{
                      transform: `translateX(${(activeToggleConsultas - 1) * 96}px)`
                    }}
                  ></div>

                  {toggleConsultas.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveToggleConsultas(item.id)}
                      className={`relative z-10 w-24 h-7 text-[12px] flex items-center justify-center rounded-full transition-all duration-300 font-medium ${activeToggleConsultas === item.id ? 'text-white' : 'text-[#2D231C]'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* arrumar um jeito de exibir consultas especificas po dia e por status */}
                {/*Seção das consultas do dia*/}
                <section className='flex flex-col gap-3 py-4 px-6 w-full'>
                  <p className='text-lg font-medium'>Para hoje</p>
                  <div className='flex flex-col gap-4'>
                    {consultas.map((item) => (
                      <CardConsulta key={item.id} item={item} />
                    ))}
                  </div>
                </section>


                {/*Seção das consultas da semana*/}
                <section className='flex flex-col gap-3 py-4 px-6 w-full'>
                  <p className='text-lg font-medium'>Para esta semana</p>
                  <div className='flex flex-col gap-4'>
                    {consultas.map((item) => (
                      <CardConsulta key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              </>) : (
                <div className='px-6 w-full'>
                  <Scheduler />
                </div>
            )
          }

        </div>
      </section>
    </div>
  )
}