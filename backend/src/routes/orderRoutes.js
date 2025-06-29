import { Router } from "express";
import {
  createOrder,
  getOrderByUserId,
} from "../controllers/orderController.js";

const orderRoutes = Router();

orderRoutes.post("/create-order", createOrder);
orderRoutes.get("/get-order-by-user/:userId", getOrderByUserId);
orderRoutes.get("/get-order-by-id/:userId/:orderId", getOrderByUserId);

export default orderRoutes;
