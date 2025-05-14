import { CircularProgress } from "@mui/material";
import { Button } from "../ui/button";

export function ErrorMessage({ refetch, isLoading, className }: { refetch: () => void, isLoading?: boolean, className?: string }) {
  return (
    <>
      <h3 className={'text-xl lg:text-2xl text-center font-medium ' + className}>Ocorreu um erro ao carregar consultas</h3>
      <p className={"text-center " + className}>Tente novamente mais tarde!</p>
      <button onClick={() => refetch()} className="flex text-white justify-center items-center bg-primary mt-2 h-8 w-40 rounded-md cursor-pointer">
        {
          isLoading ?
            <CircularProgress color="inherit" size={20} /> 
    
          : 'Recarregar'
        }
        </button>
    </>
  )
}
