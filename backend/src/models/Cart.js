import mongoose, { Schema } from "mongoose";
import Product from "./Product.js";

const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  product: [Product.schema],
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Cart", CartSchema);
