import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProductById,
  addReview,
  updateReview,
  deleteReview,
  getProductByCategory
} from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.post("/add-product", createProduct);
productRoutes.get("/get-product/:productId", getAllProducts);
productRoutes.post("/update-product/:productId", updateProduct);
productRoutes.delete("/delete-product/:productId", deleteProductById);
productRoutes.post("/add-review/:productId", addReview);
productRoutes.post("/update-review/:productId/:reviewId", updateReview);
productRoutes.delete("/delete-review/:productId/:reviewId", deleteReview);
productRoutes.get("/get-product-by-category/:category", getProductByCategory);

export default productRoutes;
