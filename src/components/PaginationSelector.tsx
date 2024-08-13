import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

type Props = {

    page : number,
    pages : number,
    onPageChange: (page : number) => void
}


const PaginationSelector = ({page,pages, onPageChange}: Props) => {

     const pageNumbers =  Array.from({
        length : pages
     },(_,index) => index + 1)

     return (
        <Pagination>

            <PaginationContent>
                
                {page !== 1 &&  <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)}/>
                   </PaginationItem> 
                }
                
            </PaginationContent>
            <PaginationContent>
                {pageNumbers.map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink 
                        href="#" 
                        onClick={() => onPageChange(number)} 
                        isActive={page === number}
                            >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {page !== pageNumbers.length && (
                    <PaginationItem>
                      <PaginationNext href="#" onClick={() => onPageChange(page + 1)}/>
                    </PaginationItem>
                )}

            </PaginationContent>
            
        </Pagination>
     )
}

export default PaginationSelector