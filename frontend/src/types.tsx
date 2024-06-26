export type UserType = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItemType = {
  _id: string;
  name: string;
  price: number;
};

export type RestaurantType = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItemType[];
  imageUrl: string;
  lastUpdate: string;
};

export type RestaurantsSearchResponse = {
  data: RestaurantType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type OrderType = {
  _id: string;
  restaurant: RestaurantType;
  user: UserType;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};
