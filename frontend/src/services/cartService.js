import api from "./api";

export const addToCart = (productObject) =>
  api.post("/cart/add-to-cart", productObject);

export const getCartById = (userId) =>
  api.get(`/cart/get-cart-by-user/${userId}`);

export const deleteCartItemById = (cartId) =>
  api.delete(`/cart/delete-cart-item/${cartId}`);

export const updateCartItemQuantity = (cartId, quantity) =>
  api.put(`/cart/update-cart-item/${cartId}`, { quantity });
