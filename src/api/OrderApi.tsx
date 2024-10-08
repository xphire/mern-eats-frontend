import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";


type CheckoutSessionRequest = {

     restaurantId : string;
     deliveryDetails: {
         email: string;
         name : string;
         addressLine1 : string;
         city: string
     },
     cartItems : {
        name : string;
        quantity : string
     }[]
}


type OrderFetchResult = {
    data : Order[],
    pagination : {
        total : number;
        page : number;
        pages : number
    }
}

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

export const useCreateCheckoutSession = () => {



    const {getAccessTokenSilently} = useAuth0()

    const createCheckoutSessionRequest = async (checkoutSessionRequest : CheckoutSessionRequest) => {

        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/v1/orders/order/checkout/create-checkout-session`,{
            method : "POST",
            headers : {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(checkoutSessionRequest)
        })


        if (!response.ok) throw new Error("unabale to create chcekout session")

        return response.json()
    }

    const {mutateAsync : createCheckoutSession, isLoading , error , reset} = useMutation(createCheckoutSessionRequest)

    if(error){
        toast.error(error.toString())
        reset();
    }

    return {

        createCheckoutSession , isLoading
    }
}


export const useGetMyOrders = (page = 1) => {

    const {getAccessTokenSilently} = useAuth0()

    const getMyOrdersRequest = async () : Promise<OrderFetchResult> => {

        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/v1/orders/my-orders?page=${page}`,
            {
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            }
        )

        if(!response.ok) throw new Error("failed to get orders")

        return response.json()
    }

    const {data : orders, isLoading , refetch } = useQuery("fetchMyOrders", getMyOrdersRequest, {refetchInterval : 500000})


    return {orders, isLoading,refetch}

}