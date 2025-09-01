import mongoose, { Schema } from "mongoose";

const ItemsSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    reqiured: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  itemTotal: {
    type: Number,
    required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderItems: [ItemsSchema],
    shippingAddress: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    grandTotal: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Refunded",
        "Returned",
        "Failed",
      ],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
