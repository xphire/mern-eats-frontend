//import React from 'react'
 
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {z} from 'zod'
import DetailsSection from './DetailsSection';
import { Separator } from '@/components/ui/separator';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/types';
import { useEffect } from 'react';


const formSchema = z.object({

    name : z.string({
        required_error : "restaurant name is required"
    }),
    city : z.string({
        required_error : "city is required"
    }),
    country : z.string({
        required_error : "country is required"
    }),
    deliveryPrice : z.coerce.number({
        required_error : "delivery price is required",
        invalid_type_error : "must be a valid number"
    }),
    estimatedDeliveryTime : z.coerce.number({
        required_error : "estimated delivery time is required",
        invalid_type_error : "must be a valid number"
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select at least one item"
    }),
    MenuItems : z.array(z.object({
        name : z.string().min(1, "name is required"),
        price : z.coerce.number().min(1, "price is required")
    })),
    imageUrl : z.string().optional(),
    imageFile : z.instanceof(File, {message : "image is required"}).optional()
    
}).refine((data) => data.imageFile || data.imageUrl, {

    message : "Either image URL or image file must be provided",
    path : ["imageFile"]
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {

    onSave : (restaurantFormData: FormData) => void;
    isLoading : boolean,
    restaurant? : Restaurant

}

const ManageRestaurantForm = ({onSave, isLoading, restaurant} : Props) => {


    const form = useForm<RestaurantFormData>({
         resolver : zodResolver(formSchema),
         defaultValues : {
            cuisines : [],
            MenuItems : [{name: "", price : 0}]
         }
        
    })


    useEffect(() => {

        if(!restaurant) return

        const deliveryPriceFormatted = Number((restaurant.deliveryPrice/100).toFixed(2))

        const MenuItemsFormatted = restaurant.MenuItems.map((item) => ({...item,price: Number((item.price/100).toFixed(2))}))


        const updatedRestaurant : Restaurant = {
            ...restaurant,
            deliveryPrice : deliveryPriceFormatted,
            MenuItems : MenuItemsFormatted
            
        }

        form.reset(updatedRestaurant)

    },[form,restaurant])





    const onSubmit = (formDataJson : RestaurantFormData) => {

        const formData = new FormData()

        formData.append("name", formDataJson.name)
        formData.append("city", formDataJson.city)
        formData.append("country", formDataJson.country)
        //converting currency value to lowest denomination eg. 1.50 USD is 150 cent, we send to stripe in the smallest denomination
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString())
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString())
        formDataJson.cuisines.forEach((cuisine, index) =>  formData.append(`cuisines[${index}]`,cuisine))
        formDataJson.MenuItems.forEach((menuItem, index) => 
            
            {
                formData.append(`MenuItems[${index}][name]`,menuItem.name)
                formData.append(`MenuItems[${index}][price]`,(menuItem.price * 100).toString())
        
            }
        )

        if(formDataJson.imageFile){

            formData.append("imageFile", formDataJson.imageFile)
        }
       


        onSave(formData)


    }

  return (
    <Form {...form}>

                <form 

                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8 bg-gray-50 p-10 rounded-lg'
                >

                        <DetailsSection/>
                        <Separator/>
                        <CuisinesSection/>
                        <Separator/>
                        <MenuSection/>
                        <Separator/>
                        <ImageSection/>
                        {isLoading ? <LoadingButton/> : <Button type='submit'>Submit</Button>}

                </form>
        
    </Form>
  )
}

export default ManageRestaurantForm