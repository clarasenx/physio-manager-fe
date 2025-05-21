"use client"
import Logo from "@/../public/iconDark.svg";
import api from '@/api/axios';
import { Input } from '@/components/ui/input';
import { danger } from '@/constants/ToastStyle';
import { CircularProgress } from '@mui/material';
import { AxiosError } from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useHookFormMask } from 'use-mask-input';
import { login } from '../actions/login';

interface ILogin {
  register: string
  password: string
}

export default function Login() {

  return (
    <div className='sm:flex bg-[#9C7C5A] w-full'>

      <section className='flex flex-col sm:w-2/5 py-7 sm:pb-0 px-10 xs:px-16 sm:px-8 lg:px-16 xl:px-20 text-[#F6F5F2] justify-evenly'>    
          <Image src={Logo} alt='Logo do site' className='w-10 sm:w-18 pb-5 self-end sm:self-center'/>
          <div className='flex flex-col 2xl:ml-14 sm:pb-28'>
            <p className='text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold md:leading-8 xl:leading-10'>Olá,</p>
            <p className='hidden sm:flex font-semibold text-xl md:text-3xl lg:text-4xl xl:text-5xl'>Bem-vindo(a)</p>
            <p className='sm:pt-2 text-sm sm:text-base xl:text-[17px] leading-5'>Faça login para gerenciar suas consultas</p>
          </div>
          {/* Info do cliente */}
        <div className='hidden sm:flex flex-col items-center font-semibold'>
          <p className='self-center pb-1'>Rafaella Kalena <br className='md:hidden'/> S. Araújo</p>
          <p>(69) 99925-0646</p>
        </div>
      </section>

      {/* Seção de Login */}
      <section className='flex flex-col sm:justify-center md:items-center sm:h-screen w-full bg-[#F9F7F3] sm:rounded-l-2xl sm:rounded-t-none rounded-t-2xl px-10 sm:px-16 pt-12 sm:pt-0'>
        <div className='flex flex-col w-full md:max-w-[500px]'>
          <h1 className='text-[#2D231C] text-3xl text-center font-semibold py-2'>Recuperar Senha</h1>

          <form>
            <div className='flex flex-col pt-3'>
              <label className='font-medium text-[#2D231C]'>Email</label>
              <input
              required
                className='border border-[#B7A17D] h-11 px-3' 
                />
            </div>
            <div className='flex flex-col pt-3'>
              <label className='font-medium text-[#2D231C]'>Senha</label>
                <Input 
                className='border border-[#B7A17D] h-11 px-3 rounded-none'
                />
            </div>
            
            <button 
              className='cursor-pointer h-11 w-full flex items-center justify-center mt-8 bg-[#82654C] text-[#F9F7F3] font-medium' 
              type="submit"
              >
                Salvar senha
                </button>
          </form>

        </div>
      </section>
    </div>
  )
}