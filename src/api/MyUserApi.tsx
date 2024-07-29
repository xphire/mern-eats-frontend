import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "@/types";

const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {

    auth0Id : string;
    email : string
}


type updateUserRequest = {

    city : string,
    country : string,
    addressLine1 : string,
    name : string
}


export const useCreateMyUser = () => {

    const {getAccessTokenSilently} = useAuth0()

    const createMyUserRequest = async (user : CreateUserRequest) => {

        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/v1/users/user`, {
             method : 'POST',
             headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken}`
             },
             body : JSON.stringify(user)
        })

        if (!response.ok){
            throw new Error('failed to create user')
        }
    }

    const {mutateAsync : createUser , isLoading, isError, isSuccess} = useMutation(createMyUserRequest)


    return {createUser, isLoading, isError, isSuccess}

}


export const useUpdateMyUser = () => {

    const {getAccessTokenSilently} = useAuth0();

    const updateMyUserRequest = async (formData : updateUserRequest) => {


        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/v1/users/user`, {
            method : "PUT",
            headers : {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type" : 'application/json'
            } ,
            body : JSON.stringify(formData)
        })

        if (!response.ok){
            throw new Error("Failed to update user")
        }

        return response.json()

    }

    const {mutateAsync : updateUser , isLoading, isSuccess, error, reset} = useMutation(updateMyUserRequest)
    
    if (isSuccess){
        toast.success("User profile updated!")
    }

    if (error){
        toast.success(error.toString())
        reset()
    }
    
    return {updateUser, isLoading, isSuccess, error, reset}
}


export const useGetMyUser = () => {

    const {getAccessTokenSilently} = useAuth0();

    const  getMyUserRequest = async () : Promise<User> => {

        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/v1/users/user`,{

            headers : {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            }
        })

        if (!response.ok) throw new Error("failed to fetch user")

        return response.json()
    }

    const {data : currentUser , isLoading , error} = useQuery("fetchCurrentUser", getMyUserRequest)

    if (error){
         
        toast.error(error.toString())
    }


    return {currentUser, isLoading}


}