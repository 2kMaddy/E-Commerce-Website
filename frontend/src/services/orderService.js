import api from "./api";

export const createOrder = (orderObject) =>
  api.post("/order/create-order", orderObject);

export const paymentVerification = (response) =>
  api.post("/order/verify-payment", response);

export const getOrderListByUserId = (userId) =>
  api.get(`/order/get-order-by-user/${userId}`);

export const cancelOrderById = (userId, orderId) =>
  api.delete(`/order/cancel-order?userId=${userId}&orderId=${orderId}`);
