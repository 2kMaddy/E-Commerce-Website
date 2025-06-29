import mongoose, { Schema } from "mongoose";

const OrderSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orderItem: {
    type: String,
    required: true,
  },
  qunatity: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Order", OrderSchema);
