import { InferSchemaType, model, Schema, Types } from "mongoose";

const orderSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  deliveryDetails: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
  },
  cartItems: [
    {
      menuItemId: { type: String, required: true },
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["placed", "paid", "inProgress", "outForDelivery", "delivered"],
  },
  createdAt: { type: Date, default: Date.now },
});

export type OrderType = InferSchemaType<typeof orderSchema>;

const Order = model("Order", orderSchema);

export default Order;
