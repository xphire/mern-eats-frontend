export type User = {

    id : string;
    email : string,
    name : string  ,
    addressLine1 : string,
    city : string,
    country : string
    
}


export type MenuItemType = {
 
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
    MenuItems: MenuItemType[];
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


