import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import googleLogin from "../controllers/authController.js";
import { verifyToken } from "../utils/tokenManager.js";
import { validateSignup, validateLogin } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.post("/register", validateSignup, registerUser);
userRoutes.post("/login", validateLogin, loginUser);
userRoutes.post("/google-login", googleLogin);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password", resetPassword);
userRoutes.get("/user-info/:userId", verifyToken, getUserProfile);
userRoutes.put("/update-user-profile/:userId", verifyToken, updateUserProfile);
userRoutes.delete("/delete-user/:userId", verifyToken, deleteProfile);

export default userRoutes;
