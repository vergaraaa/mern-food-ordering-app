export type UserType = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItemType = {
  name: string;
  price: number;
};

export type RestaurantType = {
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
