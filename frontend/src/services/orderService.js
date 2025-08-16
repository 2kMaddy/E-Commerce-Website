import api from "./api";

export const createOrder = (orderObject) =>
  api.post("order/create-order", orderObject);