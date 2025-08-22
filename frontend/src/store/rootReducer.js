import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import productReducer from "../features/Products/productSlice";
import cartReducer from "../features/Cart/cartSlice.js";
import orderReducer from "../features/Order/orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;
