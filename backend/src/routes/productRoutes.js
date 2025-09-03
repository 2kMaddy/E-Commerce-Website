import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import {
  getAllProducts,
  getProductById,
  addReview,
  updateReview,
  deleteReview,
  getProductsByFilters,
  deleteMultiProducts,
  getLatestProduct,
} from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get("/get-product", getAllProducts);
productRoutes.get("/get-latest-product", getLatestProduct);
productRoutes.get("/get-product-by-id/:productId", getProductById);
productRoutes.post("/add-review/:productId", verifyToken, addReview);
productRoutes.put(
  "/update-review/:productId/:reviewId",
  verifyToken,
  updateReview
);
productRoutes.delete(
  "/delete-review/:productId/:reviewId",
  verifyToken,
  deleteReview
);
productRoutes.delete(
  "/delete-multiple-products",
  verifyToken,
  deleteMultiProducts
);
productRoutes.get("/get-product-by-category/:category", getProductsByFilters);

export default productRoutes;
