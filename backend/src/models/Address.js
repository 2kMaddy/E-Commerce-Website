const AddressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
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
    trim: true,
    default: "India",
  },
  type: {
    type: String,
    enum: ["home", "work", "other"],
    default: "home",
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.modal("Address", AddressSchema);
