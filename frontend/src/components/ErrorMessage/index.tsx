import { CircularProgress } from "@mui/material";

export function ErrorMessage({ refetch, isLoading, className }: { refetch: () => void, isLoading?: boolean, className?: string }) {
  return (
    <div className="py-4 flex flex-col items-center gap-1" >
      <h3 className={'text-xl lg:text-2xl text-center font-medium ' + className}>Ocorreu um erro ao carregar consultas</h3>
      <p className={"text-center " + className}>Tente novamente mais tarde!</p>
      <button onClick={() => refetch()} className="flex mx-auto text-white justify-center items-center bg-primary mt-2 h-8 w-40 rounded-md cursor-pointer">
        {
          isLoading ?
            <CircularProgress color="inherit" size={20} /> 
    
          : 'Recarregar'
        }
        </button>
    </div>
  )
}
