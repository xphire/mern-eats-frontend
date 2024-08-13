export type User = {

    id : string;
    email : string,
    name : string  ,
    addressLine1 : string,
    city : string,
    country : string
    
}


type MenuItem = {
    name : string;
    price : number
}


export type Restaurant = {

    id : string;
    userId : string;
    name : string;
    city : string;
    country : string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    MenuItems: MenuItem[];
    imageUrl : string;

}


export type RestaurantSearchResponse = {
    data : Restaurant[],
    pagination : {
        total : number,
        page : number,
        pages : number
    }
}


