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
  quantity: {
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
    enum: [
      "Pending",
      "Confirmed",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "Refunded",
      "Returned",
      "Failed",
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", OrderSchema);
