import { RefObject, useEffect, useRef } from "react";
import { GoPencil } from "react-icons/go";
import { LuX } from "react-icons/lu";
import { PiEyeBold } from "react-icons/pi";

interface IScheduleMenu {
  setMenuAberto: (p: boolean) => void
  menuAberto: boolean
  className?: string
}

export const ScheduleMenu = ({
  menuAberto,
  setMenuAberto,
  className
}: IScheduleMenu) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    };

    if (menuAberto) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuAberto]);

  return (
    <div ref={menuRef} className={'w-[175px] flex flex-col absolute shadow-md p-1 rounded-lg ' + className}>
      <div className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242]'>
        <PiEyeBold  className="cursor-pointer"/>
        <button className='px-2 p-1 cursor-pointer text-[12px] font-medium rounded-lg'>Visualizar consulta</button>
      </div>
      <div className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242] '>
        <GoPencil  className="cursor-pointer"/>
        <button className='px-2 p-1 cursor-pointer text-[12px] font-medium'>Editar consulta</button>
      </div>
      <div className='flex items-center cursor-pointer px-2 py-1 rounded-lg hover:text-white hover:bg-[#6A5242]'>
        <LuX  className="cursor-pointer"/>
        <button className='px-2 p-1 cursor-pointer text-[12px] font-medium rounded-lg'>Cancelar consulta</button>
      </div>
    </div>
  )
}