import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from "@/api/MyRestaurantApi"
import OrderItemCard from "@/components/OrderItemCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {

  const  {createRestaurant,isLoading : isCreateLoading}  = useCreateMyRestaurant()
  const {restaurant} = useGetMyRestaurant()
  const {orders} = useGetMyRestaurantOrders()
  const {updateRestaurant, isLoading : isUpdateLoading} = useUpdateMyRestaurant()

  //here, if the user does not have a restaurant the restaurant result from the useGetMyRestaurant hook would be undefined
  const isEditing = !!restaurant

  return (
     
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">
             Orders
          </TabsTrigger>
          <TabsTrigger value="manage-restaurants">
             Manage Restaurants
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-5 bg-gray-50 pb-10 rounded-lg">
           <h2 className="text-2xl font-bold">{orders?.length} Active Orders</h2>
           {orders?.map((order) => (
             <OrderItemCard order={order} key={JSON.stringify(order)}/>
           ))}
        </TabsContent>
        <TabsContent value="manage-restaurants">

          <ManageRestaurantForm 
            onSave={isEditing ? updateRestaurant : createRestaurant} 
            isLoading={isCreateLoading || isUpdateLoading} 
            restaurant={restaurant}
          />

        </TabsContent>

      </Tabs>
     
  )
}

export default ManageRestaurantPage