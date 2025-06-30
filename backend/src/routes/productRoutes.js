import { Router } from "express";
import {
  getAllProducts,
  addReview,
  updateReview,
  deleteReview,
  getProductByCategory,
} from "../controllers/productController.js";
import { verifyToken } from "../utils/tokenManager.js";

const productRoutes = Router();



productRoutes.get("/get-product/:productId", verifyToken, getAllProducts);
productRoutes.post("/add-review/:productId", verifyToken, addReview);
productRoutes.post(
  "/update-review/:productId/:reviewId",
  verifyToken,
  updateReview
);
productRoutes.delete(
  "/delete-review/:productId/:reviewId",
  verifyToken,
  deleteReview
);
productRoutes.get(
  "/get-product-by-category/:category",
  verifyToken,
  getProductByCategory
);

export default productRoutes;
