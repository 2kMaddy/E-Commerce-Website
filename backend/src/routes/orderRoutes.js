import { Router } from "express";
import {
  createOrder,
  getOrderByUserId,
  getOrderById,
  cancelOrder,
  verifyPayment,
} from "../controllers/orderController.js";

const orderRoutes = Router();

orderRoutes.post("/create-order", createOrder);
orderRoutes.get("/get-order-by-user/:userId", getOrderByUserId);
orderRoutes.get("/get-order-by-id/:userId/:orderId", getOrderById);
orderRoutes.delete("/cancel-order", cancelOrder);
orderRoutes.post("/verify-payment", verifyPayment);

export default orderRoutes;
