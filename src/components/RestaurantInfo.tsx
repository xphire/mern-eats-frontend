import { Restaurant } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Dot } from "lucide-react"

type Props = {
    restaurant : Restaurant
}

const RestaurantInfo = ({restaurant} : Props) => {

  return (
      
    <Card className="border-sla">

        <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">
                 {restaurant.name}
            </CardTitle>
            <CardDescription>
                {restaurant.city}, {restaurant.country}
            </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row">
            {restaurant.cuisines.map((item,index) => (
                 
                 <span className="flex" key={item}>
                     <Dot className="block md:hidden"/>
                     <span>{item}</span>
                     {index < restaurant.cuisines.length -1 && <Dot className="hidden md:block"/>}
                 </span>
                
                 

                  
            ))}
        </CardContent>
        
    </Card>
  )
}

export default RestaurantInfo