export const UserDataCell = ({
  label, 
  data
}: {
  label: string
  data: string
}) => {
  return (
    <div className='flex flex-col sm:flex-row justify-between py-1 border-b border-[#6A5242]/45'>
      <p className='text-sm sm:text-base sm:font-medium'>{label}:</p>
      <p className='font-medium sm:font-normal line-clamp-1'>{data}</p>
    </div>
  )
}