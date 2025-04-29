'use client'

import Logo from "@/public/icon.svg";
import { useRouter } from 'next/navigation';
import { logout } from '../actions/logout';
import { LuLayoutGrid, LuCalendarDays, LuUserPen, LuList, LuLogOut, LuBell } from "react-icons/lu";
import { useState } from 'react';
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  async function handleLogout() {
    await logout()
    router.replace("/login")
  }

  const [active, setActive] = useState('dashboard');
  const navItems = [
  { id: 'dashboard', icon: <LuLayoutGrid /> },
  { id: 'calendar', icon: <LuCalendarDays /> },
  { id: 'users', icon: <LuUserPen /> },
  { id: 'menu', icon: <LuList /> },
];

  return (
    <div className='relative flex flex-col sm:flex-row sm:h-dvh'>
      <section className='flex flex-col sm:w-36 px-10 py-5 justify-items-center items-center place-content-between'>
        <Image src={Logo} alt='Logo do site' className=' sm:flex w-13  sm:mt-3 justify-self-center text-[#6A5242]'/>

        <div className='flex fixed right-0 left-0 bottom-0 py-6 sm:static'>
          <div className="flex mx-auto sm:flex-col sm:h-[240px] sm:w-[60px] bg-[#F1EDE3] rounded-full items-center sm:justify-between sm:mt-4">
            {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-14 h-14 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 text-2xl
                ${active === item.id ? 'bg-[#6B4A2E] text-white' : 'text-[#2D231C]'}`}
            >
              {item.icon}
            </button>
            ))}
          </div>
        </div>
        
        <div className="hidden sm:flex h-[100px] w-[60px] bg-[#F1EDE3] rounded-4xl flex-col items-center justify-between py-2 my-14">
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

      <section className='border-2 flex flex-col w-full'>
        <div>ola</div>
      </section>
    </div>
  )
}