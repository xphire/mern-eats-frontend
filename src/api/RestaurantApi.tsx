import { SearchState } from "@/pages/SearchPage"
import { Restaurant, RestaurantSearchResponse } from "@/types"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const useGetRestaurant = (id? : string) => {

    const getRestaurantRequest = async () : Promise<Restaurant>  => {

         const response = await fetch(`${API_BASE_URL}/api/v1/restaurants/restaurant/${id}`)

         if(!response.ok){

            throw new Error("failed to get restaurant")

         }


         return response.json()    
    }

    //enabled mean the quesry should only run when id is truthy i.e. not undefined in this case
    const {data : restaurant, isLoading} = useQuery("fetchRestaurant", getRestaurantRequest,{enabled: !!id})

    return {restaurant, isLoading}
}

export const useSearchRestaurants = (searchState : SearchState , city? : string) => {

    const createSearchRequest = async() : Promise<RestaurantSearchResponse> => {

        const params = new URLSearchParams()
        params.set("searchQuery", searchState.searchQuery)
        params.set("page",searchState.page.toString())
        params.set("selectedCuisines",searchState.selectedCuisines.join(","))
        params.set("sortOption", searchState.sortOption)

        const response  = await fetch(`${API_BASE_URL}/api/v1/restaurants/search/${city}?${params.toString()}`)

        if(!response.ok){
            throw new Error("failed to get restaurants")
        }

        return response.json()
    }

    const {data : results, isLoading} = useQuery(["searchRestaurants", searchState], createSearchRequest, {enabled : !!city})

    return {results, isLoading}
}