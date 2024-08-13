import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {

  const  {createRestaurant,isLoading : isCreateLoading}  = useCreateMyRestaurant()
  const {restaurant} = useGetMyRestaurant()
  const {updateRestaurant, isLoading : isUpdateLoading} = useUpdateMyRestaurant()

  //here, if the user does not have a restaurant the restaurant result from the useGetMyRestaurant hook would be undefined
  const isEditing = !!restaurant

  return (
    <ManageRestaurantForm 
     onSave={isEditing ? updateRestaurant : createRestaurant} 
     isLoading={isCreateLoading || isUpdateLoading} 
     restaurant={restaurant}/>
  )
}

export default ManageRestaurantPage