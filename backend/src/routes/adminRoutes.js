import { Router } from "express";
import { getAllUsers } from "../controllers/adminController.js";
import {
  getUserProfile,
  deleteProfile,
  registerUser,
  loginUser,
  updateUserProfile,
} from "../controllers/userController.js";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import {
  createProduct,
  updateProduct,
  deleteProductById,
  addBulkProducts,
} from "../controllers/productController.js";
import { verifyToken } from "../utils/tokenManager.js";
import { validateSignup, validateLogin } from "../utils/validators.js";

const adminRoutes = Router();

adminRoutes.get("/get-all-users", verifyToken, getAllUsers);
adminRoutes.get("/get-user/:userId", verifyToken, getUserProfile);
adminRoutes.delete("/delete-user/:userId", verifyToken, deleteProfile);
adminRoutes.get("/get-all-orders", verifyToken, getAllOrders);
adminRoutes.post("/update-order-status", verifyToken, updateOrderStatus);
adminRoutes.post("/admin-registration", validateSignup, registerUser);
adminRoutes.post("/admin-login", validateLogin, loginUser);
adminRoutes.post("/add-product", verifyToken, createProduct);
adminRoutes.post("/add-bulk-products", verifyToken, addBulkProducts);
adminRoutes.post("/update-product/:productId", verifyToken, updateProduct);
adminRoutes.delete(
  "/delete-product/:productId",
  verifyToken,
  deleteProductById
);
adminRoutes.post(
  "/update-user-profile/:userId",
  verifyToken,
  updateUserProfile
);
export default adminRoutes;
