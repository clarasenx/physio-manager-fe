import { ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { Steps } from './components/steps';

export default function RecuperarSenha() {

  return (
    <section className='flex flex-col sm:justify-center md:items-center sm:h-screen w-full bg-[#F9F7F3] sm:rounded-l-2xl sm:rounded-t-none rounded-t-2xl px-4 sm:px-16 pt-5 sm:pt-0'>
      <Link href='/login' className="self-start mb-10 sm:mb-auto sm:mt-10 text-primary cursor-pointer flex items-center gap-1">
        <ArrowLeft size={25} />
        <span className='text-lg font-medium'>Voltar</span>
      </Link>
      <div className='flex flex-col w-full md:max-w-[500px] mb-auto pb-20 px-6 sm:px-0'>
        <h1 className='text-[#2D231C] text-3xl text-center font-semibold py-2'>Recuperar Senha</h1>
        <p className='mb-10 text-center'>Por favor informe seu e-mail, enviaremos um código para confirmar sua identidade</p>
        <Steps />

      </div>
    </section>
  )
}