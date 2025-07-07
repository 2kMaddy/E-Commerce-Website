import { Router } from "express";
import {
  getAllProducts,
  addReview,
  updateReview,
  deleteReview,
  getProductsByFilters,
  addUpdateCart,
  deleteCartItem,
} from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get("/get-product/", getAllProducts);
productRoutes.get("/get-product-by-id/:productId", getAllProducts);
productRoutes.post("/add-review/:productId", addReview);
productRoutes.post(
  "/update-review/:productId/:reviewId",
  updateReview
);
productRoutes.delete(
  "/delete-review/:productId/:reviewId",
  deleteReview
);
productRoutes.get("/get-product-by-category", getProductsByFilters);
productRoutes.post("/add-update-cart", addUpdateCart);
productRoutes.delete("/delete-cart-item", deleteCartItem);

export default productRoutes;
