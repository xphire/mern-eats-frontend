import { useGetMyOrders } from "@/api/OrderApi"
import OrderStatusDetail from "@/components/OrderStatusDetail"
import OrderStatusHeader from "@/components/OrderStatusHeader"
import PaginationSelector from "@/components/PaginationSelector"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useEffect, useState } from "react"

const OrderStatusPage = () => {


  const [page,setPage] = useState<number>(1)
  const {orders,isLoading,refetch} = useGetMyOrders(page)


  const onPageChange = (number : number) => {

      setPage(number)
 

         
  }


  useEffect(() => {

     refetch()

  }, [page,refetch])


  if(isLoading){
     return "Loading ..."
  }

  if(!orders || orders.data.length === 0){
    return "No orders found"
  }

  return (
    <div className="space-y-10">
        {orders.data.map((order) => (
             <div className="space-y-10 bg-gray-50 p-10 rounded-lg" key={JSON.stringify(order)}>
                <OrderStatusHeader order={order}/>
                <div className="grid gap-10 md:grid-cols-2">
                  <OrderStatusDetail order={order}/>
                   <AspectRatio ratio={16/5}>
                    <img src={order.restaurant.imageUrl} className="rounded-md object-cover h-full w-full" />
                    </AspectRatio>
                </div>
             </div>
        ))}

        <PaginationSelector

         page={page}
         pages={orders.pagination.pages}
         onPageChange={onPageChange}

        />

    </div>
  )
}

export default OrderStatusPage