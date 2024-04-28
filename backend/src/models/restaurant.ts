import { InferSchemaType, model, Schema, Types } from "mongoose";

const menuItemSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export type MenuItemType = InferSchemaType<typeof menuItemSchema>;

export type RestaurantType = {
  user: Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItemType[];
  imageUrl: string;
  lastUpdate: Date;
};

const restaurantSchema = new Schema<RestaurantType>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemSchema],
  imageUrl: { type: String, required: true },
  lastUpdate: { type: Date, required: true },
});

const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;
