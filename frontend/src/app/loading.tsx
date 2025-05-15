import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div className='w-full h-dvh flex jusitfy-center items-center'>
      <CircularProgress className='mx-auto' size={60} />
    </div>
  )
}