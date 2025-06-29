import { Router } from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../controllers/cartController.js";

const cartRoutes = Router();

cartRoutes.post("/add-to-cart", addToCart);
cartRoutes.get("/get-cart/:userId", getCart);
cartRoutes.post("/update-cart", updateCartItem);
cartRoutes.delete("/delete-product-by-id/:userId/:productId", deleteCartItem);
cartRoutes.delete("/clear-cart/:userId", clearCart);

export default cartRoutes;
