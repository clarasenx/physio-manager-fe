import { LuSearch } from "react-icons/lu"
import { Input } from "../ui/input"

interface SearchInputProps {
  onChange: (value: string) => void
}

export const SearchInput = ({
  onChange
}: SearchInputProps) => {
  return (
    <div className='px-2 h-full w-full flex bg-[#F1EDE3] rounded-lg items-center gap-2 shadow cursor-pointer'>
      <LuSearch className='text-[#6A5242]' />
      <Input
        noFocusRing
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Buscar por tratamento"
        className='text-sm w-full border-0 shadow-none' />
    </div>
  )
}