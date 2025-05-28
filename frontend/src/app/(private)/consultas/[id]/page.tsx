export default async function Nota({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className='w-full h-full px-4 sm:px-8 pt-4'>
      <section className='border-x rounded-t-lg '>
        <div className='flex flex-col sm:flex-row w-full h-full items-center bg-[#9C7C5A] rounded-t-lg border-t py-2 px-4'>
          <p className='sm:text-lg lg:text-xl font-semibold text-white'>Paciente x</p>
        </div>

        <section className='bg-white px-4 py-2 grid xs:grid-cols-2 md:grid-cols-4 gap-1 md:gap-2'>
          <div className='flex flex-col sm:flex-row w-full h-full sm:gap-2 items-center col-span-1 md:col-span-2'>
            <p className='font-medium text-nowrap sm:text-lg'>Tratamento:</p>
            <p>tratamento x</p>
          </div>

          <div className='flex flex-col sm:flex-row w-full h-full sm:gap-2  items-center col-span-1 md:col-span-2'>
            <p className='font-medium sm:text-lg'>Data da consulta:</p>
            <p>10/05/25, 15:00</p>
          </div>

          <div className='flex flex-col sm:flex-row w-full h-full sm:gap-2  items-center col-span-1 md:col-span-2'>
            <p className='font-medium sm:text-lg'>Telefone:</p>
            <p>00000-0000</p>
          </div>

          <div className='flex flex-col sm:flex-row w-full h-full sm:gap-2 items-center col-span-1 md:col-span-2'>
            <p className='font-medium text-nowrap sm:text-lg'>Status:</p>
            <p>Agendada</p>
          </div>
        </section>
      </section>

      <section 
        className='flex bg-white w-full h-full max-h-4/5 rounded-b-lg sm:py-5 p-2 sm:px-4 border'>
        <textarea 
          name="" 
          id=""
          placeholder='Escreva suas anotações aqui!'
          className='w-full min-h-[300px] '></textarea>
      </section>
    </div>
  )
}