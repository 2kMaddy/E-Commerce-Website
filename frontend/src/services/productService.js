import api from "./api";

export const getAllProducts = () => api.get("/product/get-product/");

export const getProductById = (productId) =>
  api.get(`/product/get-product-by-id/${productId}`);

export const addReview = (productId, review) =>
  api.post(`/product/get-product-by-id/${productId}`, review);

export const updateReview = (productId, reviewId, updatedReview) =>
  api.put(`/product/update-review/${productId}/${reviewId}`, updatedReview);

export const deleteReview = (productId, reviewId, userId) =>
  api.delete(`/product/delete-review/${productId}/${reviewId}`, userId);

export const getProductsByCategory = (category, subCategory) =>
  api.get(
    `/product/get-product-by-category?category=${category}&subCategory=${subCategory}`
  );

export const addCart = (cartItem) => api.post("/product/add-cart", cartItem);

export const updateCart = (cartItem) =>
  api.put("/product/update-cart", cartItem);

export const deleteCartItem = (userId, cartId) =>
  api.delete("/product/delete-cart-item", { userId, cartId });
