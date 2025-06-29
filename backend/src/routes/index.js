import { Router } from "express";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import cartRoutes from "./cartRoutes.js";
import orderRoutes from "./orderRoutes.js";
import productRoutes from "./productRoutes.js";
import { verifyToken } from "../utils/tokenManager.js";

const appRouter = Router();

appRouter.use("/user", userRoutes);
appRouter.use("/admin", adminRoutes);
appRouter.use("/cart", verifyToken, cartRoutes);
appRouter.use("/order", verifyToken, orderRoutes);
appRouter.use("/product", verifyToken, productRoutes);
// Add more routes as needed

export default appRouter;
