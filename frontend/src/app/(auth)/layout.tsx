import { Welcome } from "@/components/welcome";
import { ReactNode } from "react";

export default function AuthLayout({children}: {children: ReactNode}) {
  return (
    <div className='sm:flex bg-[#9C7C5A] w-full'>
      <Welcome/>
      {children}
    </div>
  )
}