import api from "./api";

export const createOrder = (orderObject) =>
  api.post("/order/create-order", orderObject);

export const getOrderByUserId = (userId) =>
  api.get(`/order/get-order-by-user/${userId}`);

export const getOrderById = (userId, orderId) =>
    api.get(`/order/get-order-by-id/${userId}/${orderId}`)

export const deleteOrder = (userId, orderId) =>
  api.delete(`/order/cancel-order`, { userId, orderId });
