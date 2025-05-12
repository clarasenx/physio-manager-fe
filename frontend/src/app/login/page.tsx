"use client"
import api from '@/api/axios';
import Logo from "@/../public/iconDark.svg";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import { login } from '../actions/login';

interface ILogin {
  register: string
  password: string
}

export default function Login() {
  const {
    handleSubmit,
    formState: {errors},
    register
  } = useForm<ILogin>()
  const registerWithMask = useHookFormMask(register);
  const router = useRouter()

  async function onSubmit(data: ILogin) {
    const token = (await api.post("user/auth", data)).data as {token: string}
    
    await login(token)
    router.replace('/dashboard')
  }

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
      <section className='flex flex-col sm:justify-center md:items-center h-screen w-full bg-[#F9F7F3] sm:rounded-l-2xl sm:rounded-t-none rounded-t-2xl px-10 sm:px-16 pt-12 sm:pt-0'>
        <div className='flex flex-col w-full md:max-w-[500px]'>
          <h1 className='text-[#2D231C] text-3xl text-center font-semibold py-2'>Login</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col pt-3'>
              <label className='font-medium text-[#2D231C]'>CPF</label>
              <input
              required
                className='border border-[#B7A17D] h-11 px-3' 
                {...registerWithMask('register', ['999.999.999-99'],{required: true, autoUnmask: true, })}/>
            </div>
            <div className='flex flex-col pt-3'>
              <label className='font-medium text-[#2D231C]'>Senha</label>
              <input 
              required
                className='border border-[#B7A17D] h-11 px-3' 
                type="password"
                {...register('password', {required: true})}/>
            </div>
            
            <button 
              className='cursor-pointer h-11 w-full mt-8 bg-[#82654C] text-[#F9F7F3] font-medium' 
              type="submit"
              >Login</button>
          </form>

        </div>
      </section>
    </div>
  )
}