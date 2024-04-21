import { model, Schema } from "mongoose";

export type UserType = {
  _id: string;
  auth0Id: string;
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
};

const userSchema = new Schema<UserType>({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String },
  addressLine1: { type: String },
  city: { type: String },
  country: { type: String },
});

const User = model("User", userSchema);

export default User;
