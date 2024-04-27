import { Badge } from "./ui/badge";
import { Trash } from "lucide-react";
import { RestaurantType } from "@/types";
import { Separator } from "./ui/separator";
import { CartItem } from "@/pages/DetailPage";
import { Item } from "@radix-ui/react-dropdown-menu";
import { CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  restaurant: RestaurantType;
  cartItems: CartItem[];
  deleteFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, deleteFromCart }: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0 // inital total value
    );

    console.log(totalInPence);

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="font-bold text-2xl tracking-tight flex justify-between">
          <span>Your order</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
        <CardContent className="flex flex-col gap-5 p-0">
          {cartItems.map((cartItem) => (
            <div className="flex justify-between">
              <span>
                <Badge variant="outline" className="mr-2">
                  {cartItem.quantity}
                </Badge>
                {Item.name}
              </span>
              <span className="flex items-center gap-1">
                <Trash
                  className="cursor-pointer"
                  color="red"
                  size={20}
                  onClick={() => deleteFromCart(cartItem)}
                />
                ${((cartItem.price * cartItem.quantity) / 100).toFixed(2)}
              </span>
            </div>
          ))}
          <Separator />

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
          </div>

          <Separator />
        </CardContent>
      </CardHeader>
    </>
  );
};

export default OrderSummary;
