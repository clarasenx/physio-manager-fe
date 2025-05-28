export default async function Nota({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className='px-4 sm:px-8 pt-4'>
      <section className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'>
        <div className='w-full h-full flex flex-col items-center gap-2'>
          <p className='font-semibold text-nowrap sm:text-lg'>Paciente:</p>
          <p>paciente x</p>
        </div>
        <div className='w-full h-full gap-2 justify-center'>
          <p className='font-semibold text-nowrap sm:text-lg'>Tratamento:</p>
          <p>tratamento x</p>
        </div>
        <div className='w-full h-full gap-2 '>
          <p className='font-semibold text-nowrap sm:text-lg'>Data da consulta:</p>
          <p>10/05/25, 15:00</p>
        </div>
        <div className='w-full h-full gap-2'>
          <p className='font-semibold text-nowrap sm:text-lg'>Telefone:</p>
          <p>00000-0000</p>
        </div>
        <div className='w-full h-full gap-2 '>
          <p className='font-semibold text-nowrap sm:text-lg'>Status:</p>
          <p>Agendada</p>
        </div>
      </section>
      <section className='bg-white w-full h-full min-h-[200px] sm:min-h-[300px] lg:min-h-[700px] rounded-lg py-1.5 sm:py-5 px-2 sm:px-4 shadow'>
        <textarea name="" id="" className='w-full h-full'></textarea>
      </section>
    </div>
  )
}