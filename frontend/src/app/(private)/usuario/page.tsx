const Usuario = () => {
  return (
    <div className='w-full md:w-[700px] mx-auto flex flex-col gap-4 px-4 sm:px-8 pt-5'>
      <section className='flex px-4 py-3'>
        <p className='leading-4'>Bem vinda,
          <br /><span className='font-semibold text-xl text-[#2D231C]'>Rafaella Kalena</span>
        </p>
      </section>

      <section className='bg-white flex flex-col rounded-2xl'>
        <div className='bg-[#9C7C5A] px-4 py-2 rounded-t-2xl w-full '>
          <p className='font-medium text-lg text-center text-white'>Dados pessoais</p>
        </div>

        <section className='flex flex-col gap-2 px-4 py-2'>
          <div className='flex flex-col sm:flex-row justify-between py-1 border-b border-[#6A5242]/45'>
            <p className='text-sm sm:text-base sm:font-medium'>Nome:</p>
            <p className='font-medium sm:font-normal line-clamp-1'>Rafaella Kalena</p>
          </div>
          <div className='flex flex-col sm:flex-row justify-between py-1 border-b border-[#6A5242]/45'>
            <p className='text-sm sm:text-base sm:font-medium'>Email:</p>
            <p className='font-medium sm:font-normal line-clamp-1'>rafaKalenasouza@gmail.com</p>
          </div>
          <div className='flex flex-col sm:flex-row justify-between py-1 border-b border-[#6A5242]/45'>
            <p className='text-sm sm:text-base sm:font-medium'>CPF:</p>
            <p className='font-medium sm:font-normal line-clamp-1'>111.222.333.44</p>
          </div>
          <div className='flex flex-col sm:flex-row justify-between py-1 border-b border-[#6A5242]/45'>
            <p className='text-sm sm:text-base sm:font-medium'>Senha:</p>
            <p className='font-medium sm:font-normal line-clamp-1'>*******</p>
          </div>
        </section>

        <div className='flex justify-center py-2'>
          <button className='w-fit px-3 bg-[#9C7C5A] rounded-lg text-sm xs:text-base lg:text-lg sm:px-4 sm:py-1 text-white cursor-pointer shadow'>Alterar dados</button>
        </div>
        
      </section>
    </div>
  )
}

export default Usuario;