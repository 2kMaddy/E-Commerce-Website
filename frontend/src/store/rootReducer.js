import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/AuthSlice";
import productReducer from "../features/Products/productSlice";
import cartReducer from "../features/Cart/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
});

export default rootReducer;
