import Image from "next/image"
import Logo from "@/../public/iconDark.svg";

export const Welcome = () => {
  return (
    <section className='flex flex-col sm:w-2/5 py-7 sm:pb-0 px-10 xs:px-16 sm:px-8 lg:px-16 xl:px-20 text-[#F6F5F2] justify-evenly'>
      <Image src={Logo} alt='Logo do site' className='w-10 sm:w-18 pb-5 self-end sm:self-center' />
      <div className='flex flex-col 2xl:ml-14 sm:pb-28'>
        <p className='text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold md:leading-8 xl:leading-10'>Olá,</p>
        <p className='hidden sm:flex font-semibold text-xl md:text-3xl lg:text-4xl xl:text-5xl'>Bem-vinda</p>
        <p className='sm:pt-2 text-sm sm:text-base xl:text-[17px] leading-5'>Faça login para gerenciar suas consultas</p>
      </div>
      {/* Info do cliente */}
      <div className='hidden sm:flex flex-col items-center font-semibold'>
        <p className='self-center pb-1'>Rafaella Kalena <br className='md:hidden' /> S. Araújo</p>
        <p>(69) 99925-0646</p>
      </div>
    </section>
  )
}