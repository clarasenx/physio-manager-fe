'use client'
  
import Logo from "../../../public/icon.svg";
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '../actions/logout';
import { LuLayoutGrid, LuCalendarDays, LuUserPen, LuList, LuLogOut, LuBell } from "react-icons/lu";
import Image from 'next/image';

const Navbar = () => {
    const router = useRouter();
    async function handleLogout() {
      await logout()
      router.replace("/login")
    }
  
    const navItems = [
    { id: 'dashboard', icon: <LuLayoutGrid />, rota: "/dashboard" },
    { id: 'calendar', icon: <LuCalendarDays />, rota: "/consultas" },
    { id: 'users', icon: <LuUserPen />, rota: "/pacientes" },
    { id: 'menu', icon: <LuList />, rota: "/menu"},
  ];

  const pathname = usePathname();
  const hideHeader = pathname === '/login';

  if (hideHeader) return null;
  
  return (
    <section className='flex flex-col h-full md:w-36 md:px-10 py-5 justify-items-center sm:items-center justify-between'>
        <div className='flex flex-col sm:items-center'>
          <Image src={Logo} alt='Logo do site' className='hidden md:flex w-13 sm:mt-3'/>

          <div className='flex fixed right-0 left-0 bottom-0 py-6 md:static'>
            <div className="flex mx-auto md:flex-col md:h-[240px] md:w-[60px] bg-[#ece2c9] rounded-full items-center sm:justify-between sm:mt-4 shadow-md">
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
        

        
        
        <div className="hidden md:flex h-[100px] w-[60px] bg-[#ece2c9] rounded-4xl flex-col items-center justify-between py-2 my-9">
          <button
            className='w-14 h-14 flex items-center justify-center rounded-full text-[#2D231C] cursor-pointer transition-all py-2 px-3 duration-300 text-2xl'>
            <LuBell />
          </button>
          <button 
            onClick={handleLogout}
            className='w-14 h-14 py-2 px-3  flex items-center justify-center text-[#2D231C] rounded-full cursor-pointer transition-all duration-300 text-2xl'>
              <LuLogOut />
            </button>
        </div>
      </section>
  )
}

export default Navbar;