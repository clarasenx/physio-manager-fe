'use client'

import { AppointmentStatus } from "@/enum/appointment-status.enum";
import { useEffect, useRef } from "react";
import { GoPencil } from "react-icons/go";
import { LuX } from "react-icons/lu";
import { PiEyeBold } from "react-icons/pi";
import { VscDebugStart } from "react-icons/vsc";
import { ConsultaActionDialog } from "../actionDialog";
import { actionTypeView } from "@/constants/actionTypeView";
import { ConsultaCancelDialog } from "../cancelDialog";
import { ConsultaEditDialog } from "../editDialog";
import { ConsultaActiveDialog } from "../activeDialog";
import { GrUpdate } from "react-icons/gr";
import { ConsultaViewDialog } from "../viewDialog";
import { isAppointmentStarted } from "@/utils/isAppointmentStarted";
import { AppointmentType } from "@/dtos/appointment/appointment.schema";

interface IAppointmentMenu {
  setMenuAberto: (p: boolean) => void
  menuAberto: boolean
  className?: string
  appointment: AppointmentType
}

export const AppointmentMenu = ({
  menuAberto,
  setMenuAberto,
  className,
  appointment,
}: IAppointmentMenu) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Verifica se o clique foi fora do menu
      const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(target);

      // Verifica se o clique foi dentro de algum dialog (ajuste o seletor conforme sua estrutura)
      const isInsideDialog = !!document.querySelector('[role="dialog"]');

      if (clickedOutsideMenu && !isInsideDialog) {
        setMenuAberto(false);
      }
    };

    if (menuAberto) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuAberto, setMenuAberto]);

  const actionType: 'START' | 'CONCLUDE' = isAppointmentStarted(appointment) ?
    'CONCLUDE' : 'START'



  return (
    <div ref={menuRef} className={'w-[175px] z-100 flex flex-col absolute shadow-lg p-1 rounded-lg ' + className}>
      <ConsultaViewDialog appointment={appointment}>
        <button className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242]'>
          <PiEyeBold />
          <p className='px-2 p-1 cursor-pointer text-[12px] font-medium rounded-lg'>Visualizar consulta</p>
        </button>
      </ConsultaViewDialog>
      {
        appointment.status === AppointmentStatus.SCHEDULED ?
          <ConsultaActionDialog appointment={appointment} closeMenu={() => setMenuAberto(false)}>
            <button className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242]'>
              <VscDebugStart />
              <p className='px-2 p-1 cursor-pointer text-[12px] font-medium rounded-lg'>{actionTypeView[actionType]} consulta</p>
            </button>
          </ConsultaActionDialog> : <></>
      }
      <ConsultaEditDialog appointment={appointment} closeMenu={() => setMenuAberto(false)}>
        <button className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242] '>
          <GoPencil />
          <p className='px-2 p-1 cursor-pointer text-[12px] font-medium'>Editar consulta</p>
        </button>
      </ConsultaEditDialog>
      {
        appointment.status === AppointmentStatus.SCHEDULED ?
          <ConsultaCancelDialog appointment={appointment}>
            <button className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242]'>
              <LuX />
              <p className='px-2 p-1 cursor-pointer text-[12px] font-medium rounded-lg'>Cancelar consulta</p>
            </button>
          </ConsultaCancelDialog> :
          appointment.status === AppointmentStatus.CANCELED ?
            <ConsultaActiveDialog appointment={appointment}>
              <button className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242]'>
                <GrUpdate />
                <p className='px-2 p-1 cursor-pointer text-[12px] font-medium rounded-lg'>Ativar consulta</p>
              </button>
            </ConsultaActiveDialog> :
            <></>
      }
    </div>
  )
}
