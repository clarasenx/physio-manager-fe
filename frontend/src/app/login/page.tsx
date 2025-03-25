import Image from 'next/image'
import Logo from "@/public/icon.svg";

export default function Login() {
  return (
    <div className='sm:flex bg-[#9C7C5A]'>

      <section className='flex flex-col sm:w-2/5 px-8 xs:px-16 sm:px-8 lg:px-16 xl:px-20 pt-8 text-[#F1EDE3] justify-between'>
        <div>
          <div className='flex flex-col'>
            <Image src={Logo} alt='Logo do site' className='w-10 sm:w-12 pb-5 sm:pb-20 self-end sm:self-center'/>
            <p className='text-xl md:text-3xl lg:text-4xl font-semibold md:leading-8'>Olá,</p>
          </div>
          <p className='hidden sm:flex font-semibold text-xl md:text-3xl lg:text-4xl'>Bem-vindo(a)</p>
          <p className='pb-4 xs:pb-8 sm:pt-6 text-sm lg:text-base leading-5'>Faça login para gerenciar suas consultas</p>
        </div>

          {/* Info do cliente */}
        <div className='hidden sm:flex flex-col items-center pb-12 font-semibold'>
          <p>Rafaella Kalena S. Araújo</p>
          <p>(69) 99925-0646</p>
        </div>
      </section>

      {/* Seção de Login */}
      <section className='h-screen w-full bg-[#F9F7F3] sm:rounded-l-2xl rounded-t-2xl'>
        <h1>tela de login :P</h1>
      </section>
    </div>
  )
}