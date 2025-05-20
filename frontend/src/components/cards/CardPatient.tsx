'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PatientType } from '@/dtos/patient/patient.schema'
import { formatPhone } from '@/utils/formatPhone'
import { useEffect, useState } from 'react'
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa'

export const CardPatient = ({ patient }: { patient: PatientType }) => {
  const [ formatedDate, setFormatedDate ] = useState<string>('')

  useEffect(() => {
    const date = new Date(patient.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    setFormatedDate(date)
  }, [ patient.createdAt, formatedDate, setFormatedDate ])

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50">
      <td className="p-3">{patient.name}</td>
      <td className="p-3">{formatPhone(patient.phone)}</td>
      <td className="p-3">{formatedDate}</td>
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
  )
}

export const CardPatientMobile = ({ patient }: { patient: PatientType }) => {

  const [ formatedDate, setFormatedDate ] = useState<string>('')

  useEffect(() => {
    const date = new Date(patient.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    setFormatedDate(date)
  }, [ patient.createdAt, formatedDate, setFormatedDate ])

  const [ activeToggleInicial, setActiveToggleInicial ] = useState(1);
  const toggleInicial = [
    { id: 1, label: "Agendadas" },
    { id: 2, label: "Finalizadas" },
  ]

  return (
    <div className='h-fit flex flex-col px-3 sm:px-4 border rounded-xl shadow-md bg-white'>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{patient.name}</AccordionTrigger>
          <AccordionContent>
            <div className='flex items-center gap-2'>
              <p className='text-[#82654C] font-semibold'>Telefone:</p>
              <p>{formatPhone(patient.phone)}</p>
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-[#82654C] font-semibold'>Nascimento:</p>
              <p>{formatedDate}</p>
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-[#82654C] w-fit font-semibold'>Última consulta:</p>
              <p>{formatedDate}</p>
            </div>
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
                <div className='grid grid-cols-2 gap-1 px-2 sm:px-4 py-2 bg-[#9C7C5A] text-white rounded-t-lg'>
                  <p>Tratamento</p>
                  <p>Data</p>
                </div>
                <section className='px-2 sm:px-4 pb-2 bg-[#F1EDE3]'>
                  <div className='grid grid-cols-2 pt-2 gap-1 bg-[#F1EDE3]'>
                    <p>Tratamento miofacial</p>
                    <p>12/05/25</p>
                  </div>
                  <div className='grid grid-cols-2 pt-2 gap-1'>
                    <p>Tratamento 2</p>
                    <p>12/05/25</p>
                  </div>
                </section>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <button className="bg-[#E3D4C0] hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
                <FaTrash size={14} />
              </button>
              <button className="bg-[#E3D4C0] hover:bg-[#6B4A2E] text-[#2D231C] hover:text-white p-2 rounded-lg transition">
                <FaPencilAlt size={14} />
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}