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
  productName: {
    type: String,
    required: true,
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
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", ProductSchema);
