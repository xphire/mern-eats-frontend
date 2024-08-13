import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

const DetailsSection = () => {

    const {control } = useFormContext()
    
  return (

    

    <div className="space-y-2">

        <div>
            <h2 className="text-2xl font-bold">Details</h2>
            <FormDescription>
                Enter the details about your restaurant
            </FormDescription>
        </div>
        <FormField 
            control={control} 
            name="name" 
            defaultValue=""
            render={({field}) => (<FormItem>
                <FormLabel>
                    Restaurant Name
                </FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white"/>
                    
                </FormControl>
                <FormMessage/>
            </FormItem>) }
        />

        <div className="flex gap-4">

        <FormField 
            control={control} 
            name="city" 
            defaultValue=""
            render={({field}) => (<FormItem className="flex-1">
                <FormLabel>
                    City
                </FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white"/>
                    
                </FormControl>
                <FormMessage/>
            </FormItem>) }
        />

        <FormField 
            control={control} 
            name="country"
            defaultValue="" 
            render={({field}) => (<FormItem className="flex-1">
                <FormLabel>
                    Country
                </FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white"/>
                    
                </FormControl>
                <FormMessage/>
            </FormItem>) }
        />
             
        </div>

        <FormField 
            control={control} 
            name="deliveryPrice"
            defaultValue={0.00} 
            render={({field}) => (<FormItem className="max-w-[25%]">
                <FormLabel>
                    Delivery Price ($)
                </FormLabel>
                <FormControl>
                    <Input {...field} type="number" className="bg-white" placeholder="1.50" step="0.01"/>
                    
                </FormControl>
                <FormMessage/>
            </FormItem>) }
        />

        <FormField 
            control={control} 
            name="estimatedDeliveryTime" 
            defaultValue={30}
            render={({field}) => (<FormItem className="max-w-[25%]">
                <FormLabel>
                    Estimated Delivery Time (minutes)
                </FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white" placeholder="30" type="number" step="1"/>
                    
                </FormControl>
                <FormMessage/>
            </FormItem>) }
        />


    </div>
  )
}

export default DetailsSection