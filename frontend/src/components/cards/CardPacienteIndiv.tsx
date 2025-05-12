import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';

const CardPacienteIndiv = () => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className='hover:cursor-pointer'>Raissa Andrade</AccordionTrigger>
        <AccordionContent>
          <div>
            <p>info do paciente</p>
          </div>
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
        </AccordionContent>
      </AccordionItem> 
    </Accordion>
    </div>
  )
}

export default CardPacienteIndiv;