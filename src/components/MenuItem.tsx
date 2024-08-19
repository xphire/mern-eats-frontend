import { MenuItemType } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { CartItem } from "@/pages/DetailPage"

type Props = {

    menuItem : MenuItemType,
    addToCart : () => void,
    cart : CartItem[]


}

const MenuItem = ({menuItem, addToCart, cart} : Props) => {

  const inCart = cart.map(item => item.name).includes(menuItem.name)

  return (
    <Card className="cursor-pointer flex justify-between" >

        <div>

          <CardHeader>
              <CardTitle>{menuItem.name}</CardTitle>
          </CardHeader>
          <CardContent className="font-bold">
              ${(menuItem.price/100).toFixed(2)}
          </CardContent>

        </div>

        <div className="flex flex-col justify-center items-center mr-10">

          <Button className="bg-green-500 shadow-lg hover:bg-slate-300 hover:text-black" onClick={addToCart}>
            {inCart ? "Add More To Order" : "Add To Order"}
          </Button>
        
        </div>
       
       

    </Card>
  )
}

export default MenuItem