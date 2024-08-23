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


export type OrderStatus = "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";


export type Order = {
     id : string;
     restaurant : Restaurant;
     user : User;
     cartItems : {
        name : string;
        quantity : number
     }[];
     deliveryDetails: {
        email : string;
        name : string;
        addressLine1 : string;
        city : string
     },
     totalAmount : number,
     status : OrderStatus;
     createdAt: string;
     restaurantId : string


}


export type RestaurantSearchResponse = {
    data : Restaurant[],
    pagination : {
        total : number,
        page : number,
        pages : number
    }
}


