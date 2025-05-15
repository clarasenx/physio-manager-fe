'use client'

import { ScheduleStatus } from "@/enum/schedule-status.enum";
import { useEffect, useRef } from "react";
import { GoPencil } from "react-icons/go";
import { LuX } from "react-icons/lu";
import { PiEyeBold } from "react-icons/pi";
import { VscDebugStart } from "react-icons/vsc";
import { ListScheduleType } from "@/dtos/schedule/list-schedule.dto";
import { ConsultaActionDialog } from "../actionDialog";
import { isScheduleStarted } from "@/utils/isScheduleStarted";
import { actionTypeView } from "@/constants/actionTypeView";
import { ConsultaCancelDialog } from "../cancelDialog";
import { ConsultaEditDialog } from "../editDialog";
import { ConsultaActiveDialog } from "../activeDialog";
import { GrUpdate } from "react-icons/gr";
import { ConsultaViewDialog } from "../viewDialog";

interface IScheduleMenu {
  setMenuAberto: (p: boolean) => void
  menuAberto: boolean
  className?: string
  schedule: ListScheduleType
}

export const ScheduleMenu = ({
  menuAberto,
  setMenuAberto,
  className,
  schedule,
}: IScheduleMenu) => {
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
  }, [menuAberto]);

  const actionType: 'START' | 'CONCLUDE' = isScheduleStarted(schedule) ?
    'CONCLUDE' : 'START'



  return (
    <div ref={menuRef} className={'w-[175px] flex flex-col absolute shadow-lg p-1 rounded-lg ' + className}>
      <ConsultaViewDialog schedule={schedule}>
        <button className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242]'>
          <PiEyeBold />
          <p className='px-2 p-1 cursor-pointer text-[12px] font-medium rounded-lg'>Visualizar consulta</p>
        </button>
      </ConsultaViewDialog>
      {
        schedule.status === ScheduleStatus.SCHEDULED ?
          <ConsultaActionDialog schedule={schedule} closeMenu={() => setMenuAberto(false)}>
            <button className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242]'>
              <VscDebugStart />
              <p className='px-2 p-1 cursor-pointer text-[12px] font-medium rounded-lg'>{actionTypeView[actionType]} consulta</p>
            </button>
          </ConsultaActionDialog> : <></>
      }
      <ConsultaEditDialog schedule={schedule} closeMenu={() => setMenuAberto(false)}>
        <button className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242] '>
          <GoPencil />
          <p className='px-2 p-1 cursor-pointer text-[12px] font-medium'>Editar consulta</p>
        </button>
      </ConsultaEditDialog>
      {
        schedule.status === ScheduleStatus.SCHEDULED ?
          <ConsultaCancelDialog schedule={schedule}>
            <button className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242]'>
              <LuX />
              <p className='px-2 p-1 cursor-pointer text-[12px] font-medium rounded-lg'>Cancelar consulta</p>
            </button>
          </ConsultaCancelDialog> :
          schedule.status === ScheduleStatus.CANCELED ?
            <ConsultaActiveDialog schedule={schedule}>
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
