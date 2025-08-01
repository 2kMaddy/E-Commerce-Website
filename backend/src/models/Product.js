import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ImageSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
});

const ProductSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: true,
  },
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Plain Teez",
      "Polo Teez",
      "Over Size",
      "Acid Wash",
      "Printed Teez",
      "Custom Teez",
    ],
  },
  subCategory: {
    type: String,
    enum: ["", "Acid", "Polo", "Over Size", "Polo"],
  },
  image: [ImageSchema],
  stock: {
    type: Number,
    required: true,
  },
  size: {
    type: [String],
    enum: ["S", "M", "L", "XL", "XXL", "XXXL"],
    default: [],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  estimateDeliveryTime: {
    type: Number,
    default: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", ProductSchema);
