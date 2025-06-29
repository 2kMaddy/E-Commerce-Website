import mongoose, { Schema } from "mongoose";

const AddressSchema = new mongoose.Schema({
  doorNo: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
    default: "India",
  },
  type: {
    type: String,
    enum: ["home", "work", "other"],
    default: "shipping",
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  addresses: [AddressSchema],
});

export default mongoose.model("User", UserSchema);
