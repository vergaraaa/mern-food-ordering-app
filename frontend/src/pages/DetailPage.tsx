import { useState } from "react";
import { MenuItemType } from "@/types";
import MenuItem from "@/components/MenuItem";
import { useParams } from "react-router-dom";
import OrderSummary from "@/components/OrderSummary";
import { Card, CardFooter } from "@/components/ui/card";
import { useGetRestaurant } from "@/api/RestaurantsApi";
import RestaurantInfo from "@/components/RestaurantInfo";
import CheckoutButton from "@/components/CheckoutButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);

    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      // check if item is already in cart
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems: CartItem[];

      // if item in cart already
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        // if not
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const deleteFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      let updatedCartItems: CartItem[];

      const updatedCarItem = { ...cartItem, quantity: cartItem.quantity - 1 };

      if (updatedCarItem.quantity === 0) {
        updatedCartItems = prevCartItems.filter(
          (item) => cartItem._id !== item._id
        );
      } else {
        updatedCartItems = prevCartItems.map((item) =>
          cartItem._id === item._id ? updatedCarItem : item
        );
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  if (isLoading || !restaurant) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />

          <span className="text-2xl font-bold tracking-tight">Menu</span>

          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              deleteFromCart={deleteFromCart}
            />
            <CardFooter>
              <CheckoutButton />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
