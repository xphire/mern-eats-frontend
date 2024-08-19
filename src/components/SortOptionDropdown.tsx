import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
   
    onChange : (value : string) => void;
    sortOption : string;

}

const SORT_OPTIONS = [
    
    {
        label : "Best match",
        value: "updatedAt"
    },
    {
        label : "Delivery Price",
        value: "deliveryPrice"
    },
    {
        label : "Estimated Delivery Time",
        value: "estimatedDeliveryTime"
    },
]

const SortOptionDropdown = ({onChange, sortOption} : Props) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
                   <Button variant="outline" className="w-full">
                         Sort by : {SORT_OPTIONS.find(x => x.value === sortOption)?.label}
                   </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {SORT_OPTIONS.map((option) => (

                <DropdownMenuItem className="cursor-pointer" onClick={() => onChange(option.value)} key={option.value}>
                     {option.label}
                </DropdownMenuItem>


            ))}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortOptionDropdown