import api from "./api";

export const getAllProducts = (page, sortBy, searchQuery) =>
  api.get(
    `/product/get-product?page=${page}&sortBy=${sortBy}&searchQuery=${searchQuery}`
  );

export const getLatestProduct = () => api.get("/product/get-latest-product");

export const getProductsByCategory = (page, category) =>
  api.get(`/product/get-product-by-category/${category}?page=${page}&limit=12`);

export const getProductById = (productId) =>
  api.get(`/product/get-product-by-id/${productId}`);

export const addReviewToProduct = (productId, review) =>
  api.post(`/product/add-review/${productId}`, review);
