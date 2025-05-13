import { Button } from "../ui/button";

export function ErrorMessage({ refetch, className }: { refetch: () => void, className?: string }) {
  return (
    <>
      <h3 className={'text-xl lg:text-2xl text-center font-medium ' + className}>Ocorreu um erro ao carregar consultas</h3>
      <p className={"text-center " + className}>Tente novamente mais tarde!</p>
      <Button onClick={() => refetch()}>Recarregar</Button>
    </>
  )
}
