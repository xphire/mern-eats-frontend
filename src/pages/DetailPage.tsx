import { useGetRestaurant } from "@/api/RestaurantApi"
import { useCreateCheckoutSession } from "@/api/OrderApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { userFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom"


export type CartItem  = MenuItemType & {

 quantity : number
} 

const DetailPage = () => {


    const {id} = useParams()
    const {restaurant,isLoading} = useGetRestaurant(id);
    const {createCheckoutSession, isLoading : isCheckoutLoading} = useCreateCheckoutSession()

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {

        const storedCartItmes = sessionStorage.getItem(`cartItems-${id}`)

        return storedCartItmes ? JSON.parse(storedCartItmes) : []
    })

    const addToCart = (menuItem : MenuItemType) => {


        setCartItems((prevCartItems) => {

             //menuItem is not supposed to have the ID property
            const existingCartItem = prevCartItems.find((item) => item.name === menuItem.name )

            let updatedCartItems;

            if (existingCartItem){

                updatedCartItems = prevCartItems.map((item) =>  item.name === menuItem.name ? {...item, quantity : item.quantity + 1} : item)

                return updatedCartItems;
            }else{

                 updatedCartItems = [...prevCartItems, {
                        price : menuItem.price,
                        name : menuItem.name,
                        quantity : 1
                 }]
            }


            sessionStorage.setItem(`cartItems-${id}`, JSON.stringify(updatedCartItems))


            return updatedCartItems


        

        })


    }

    const removeFromCart = (cartItem : CartItem) => {

          setCartItems((prevCartItems) => {

              const updatedCartItems = prevCartItems.filter(item => item.name !== cartItem.name)

              sessionStorage.setItem(`cartItems-${id}`, JSON.stringify(updatedCartItems))

              return updatedCartItems
          })
    }

    if(!restaurant) return


    const onCheckout = async (userFormData : userFormData) => {

        const checkoutData = {

            cartItems : cartItems.map((item) => ({

                name : item.name,
                quantity : String(item.quantity)

            })),
            restaurantId : restaurant?.id ,
            deliveryDetails : {
                name : userFormData.name,
                addressLine1 : userFormData.addressLine1,
                city : userFormData.city,
                email : userFormData.email as string
            }
        }

        const data = await createCheckoutSession(checkoutData)

        window.location.href = data.url


    }


    if(isLoading || !restaurant){
        return "Loading..."
    }

  return (
    <div className="flex flex-col gap-10 ">
        <AspectRatio ratio={16/5}>
             <img 
               src={restaurant.imageUrl} 
               className="rounded-md object-cover h-full w-full" 
               alt="restaurant image" />
        </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32 ">

            <div className="flex flex-col gap-4">
                <RestaurantInfo restaurant={restaurant}/>
                <span className="text-2xl font-bold tracking-tight">Menu</span>
                {restaurant.MenuItems.map((menuItem,index) => (
                     <MenuItem menuItem={menuItem} addToCart={()=> addToCart(menuItem)} cart={cartItems} key={`${menuItem.name + index}`}/>
                ))}
            </div>
            <div>
                <Card>
                    <OrderSummary 
                      restaurant={restaurant} 
                      cartItems={cartItems} 
                      removeFromCart={removeFromCart}
                    />
                    <CardFooter>
                        <CheckoutButton 
                        
                         disabled={cartItems.length === 0}
                         onCheckout={onCheckout}
                         isLoading={isCheckoutLoading}
                         
                         />
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default DetailPage