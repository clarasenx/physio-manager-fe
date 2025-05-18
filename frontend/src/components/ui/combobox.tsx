"use client"

import { ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils'
import { Input } from './input'

interface ComboboxProps {
  searchPlaceholder: string
  placheholder?: string
  className?: string
  onSearch: (value: string) => void
  listItems: (close: () => void) => React.ReactNode
}

export function Combobox({
  placheholder,
  searchPlaceholder,
  className,
  onSearch,
  listItems
}: ComboboxProps) {
  const [ open, setOpen ] = React.useState(false)


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(`sm:w-[200px] justify-`, className)}
        >
          <span className="truncate text-start w-full">
            {placheholder}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-[200px] p-0">
        <Command>
          <Input
            noFocusRing
            className="border-t-0 border-x-0 rounded-none border-b mt-2 h-9 text-sm"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
          />
          <CommandList>
            {listItems(() => setOpen(false))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
