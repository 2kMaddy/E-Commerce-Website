import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/tokenManager.js";
import { validateSignup, validateLogin } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.post("/register", validateSignup, registerUser);
userRoutes.post("/login", validateLogin, loginUser);
userRoutes.get("/user-info/:userId", verifyToken, getUserProfile);
userRoutes.post("/update-user-profile/:userId", verifyToken, updateUserProfile);
userRoutes.delete("/delete-user/:userId", verifyToken, deleteProfile);

export default userRoutes;
