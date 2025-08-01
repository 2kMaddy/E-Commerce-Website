import api from "./api";

export const getAllProducts = (page) =>
  api.get(`/product/get-product?page=${page}`);

export const getLatestProduct = () => api.get("/product/get-latest-product");

export const getProductsByCategory = (page, category) =>
  api.get(
    `/product/get-product-by-category?page=${page}&limit=10&category=${category}`
  );

export const getProductById = (productId) =>
  api.get(`/product/get-product-by-id/${productId}`);

export const addReviewToProduct = (productId, review) => 
  api.post(`/product/add-review/${productId}`, review)
