'use client'

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LuCalendarDays, LuLayoutGrid, LuList, LuLogOut, LuUser, LuUserPen } from "react-icons/lu";
import Logo from "../../public/icon.svg";
import { LogoutDialog } from "./logoutDialog";

const Navbar = () => {


  const navItems = [
    { id: 'dashboard', icon: <LuLayoutGrid />, rota: "/dashboard" },
    { id: 'calendar', icon: <LuCalendarDays />, rota: "/consultas" },
    { id: 'users', icon: <LuUserPen />, rota: "/pacientes" },
    { id: 'tratamento', icon: <LuList />, rota: "/tratamentos"},
  ];

  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className='flex flex-col lg:h-dvh lg:w-36 lg:px-10 lg:py-5 justify-items-center lg:items-center justify-between'>


      <div className="flex fixed top-0 z-40 lg:hidden bg-[#F6F5F2] items-center pl-4 pr-2 lg:pl-8 lg:pr-5 py-1 justify-between w-full shadow-md">
        <Image src={Logo} alt='Logo do site' className='w-10 h-10' />
        <div className="flex items-center justify-between py-2 gap-1 lg:gap-5">
          <button
            onClick={() => {
              router.push('/usuario')
            }}
            className='flex items-center justify-center rounded-full text-[#2D231C] cursor-pointer transition-all py-2 px-3 duration-300 text-2xl'>
            <LuUser />
          </button>

          <LogoutDialog>
            <button
              className='flex items-center justify-center text-[#2D231C] rounded-full cursor-pointer transition-all py-2 px-3 duration-300 text-2xl'>
              <LuLogOut />
            </button>
          </LogoutDialog>
        </div>
      </div>

      <div className='flex flex-col lg:items-center z-40'>
        <Image src={Logo} alt='Logo do site' className='hidden lg:block w-13 lg:mt-3' />

        <div className='flex fixed w-full right-0 left-0 bg-[#F6F5F2] bottom-0 visible shadow-[-4px_-4px_5px_rgba(0,0,0,0.1)] lg:shadow-none py-1 lg:py-6 lg:static'>
          <div className="flex mx-auto lg:flex-col lg:h-[240px] lg:w-[60px] bg-[#ece2c9] rounded-full items-center lg:justify-between lg:mt-4 shadow-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.rota)
                }
                }
                className={`w-14 h-14 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 text-2xl
                  ${pathname === item.rota ? 'bg-[#6B4A2E] text-white' : 'text-[#2D231C]'}`}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex h-[100px] w-[60px] bg-[#ece2c9] rounded-4xl flex-col items-center justify-between py-2 my-9">
        <button
          onClick={() => {
            router.push('/usuario')
          }}
          className='w-14 h-14 flex items-center justify-center rounded-full text-[#2D231C] cursor-pointer transition-all py-2 px-3 duration-300 text-2xl'>
          <LuUser />
        </button>
        <LogoutDialog>
          <button
            className='w-14 h-14 py-2 px-3  flex items-center justify-center text-[#2D231C] rounded-full cursor-pointer transition-all duration-300 text-2xl'>
            <LuLogOut />
          </button>
        </LogoutDialog>
      </div>
    </section>
  )
}

export default Navbar;