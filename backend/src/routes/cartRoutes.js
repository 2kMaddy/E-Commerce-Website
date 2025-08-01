import { Router } from "express";
import {
  addToCart,
  getCartByUserId,
  deleteCartItem,
  updateCartItem,
} from "../controllers/cartController.js";

const cartRoutes = Router();

cartRoutes.post("/add-to-cart", addToCart);
cartRoutes.get("/get-cart-by-user/:userId", getCartByUserId);
cartRoutes.delete("/delete-cart-item/:cartId", deleteCartItem);
cartRoutes.put("/update-cart-item/:cartId", updateCartItem);

export default cartRoutes;
