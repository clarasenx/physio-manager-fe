import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Dispatch, SetStateAction } from "react"

interface PaginatorProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  hasMore: boolean
}

export const Paginator = ({
  page,
  setPage,
  hasMore,
}: PaginatorProps) => {


  const nextPage = () => {
    setPage(currentPage => currentPage + 1)
  }

  const previousPage = () => {
    setPage(currentPage => currentPage - 1)
  }

  return (
    <div className="w-full flex jusitfy-center items-center">
      <Pagination>
        <PaginationContent>
          {
            page !== 1 ?
              <>
                <PaginationItem onClick={previousPage}>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem onClick={previousPage}>
                  <PaginationLink>{page - 1}</PaginationLink>
                </PaginationItem>
              </> : <></>
          }
          <PaginationItem>
            <PaginationLink isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          {
            hasMore ?
              <>
                <PaginationItem onClick={nextPage}>
                  <PaginationLink>{page + 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem onClick={nextPage}>
                  <PaginationNext />
                </PaginationItem>
              </> : <></>
          }
        </PaginationContent>
      </Pagination>
    </div>
  )
}