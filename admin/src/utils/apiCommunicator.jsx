import axios from "axios";
import Cookies from "js-cookie";

const headerObject = () => {
  const authToken = Cookies.get("adminToken");
  if (!authToken) return {};
  return {
    Authorization: `Bearer ${authToken}`,
  };
};

const handleApiError = (error) => {
  if (error.response && error.response.data) {
    return error.response.data;
  }
  return { success: false, message: "Network error" };
};

export const adminLoginSubmit = async (email, password) => {
  try {
    const response = await axios.post("/api/admin/admin-login", {
      email,
      password,
    });
    if (response.data && response.data.authToken) {
      Cookies.set("adminToken", response.data.authToken, { expires: 7 });
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get("/api/admin/get-all-users", {
      headers: headerObject(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`/api/admin/get-user/${userId}`, {
      headers: headerObject(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(`/api/admin/delete-user/${userId}`, {
      headers: headerObject(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get("/api/admin/get-all-orders", {
      headers: headerObject(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.post(
      "/api/admin/update-order-status",
      {
        orderId,
        status,
      },
      { headers: headerObject() }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const adminRegistration = async (
  email,
  name,
  password,
  role = "admin"
) => {
  try {
    const response = await axios.post("/api/admin/admin-registration", {
      email,
      name,
      password,
      role,
    });
    if (response.data && response.data.authToken) {
      Cookies.set("adminToken", response.data.authToken, { expires: 7 });
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addProduct = async (
  productName,
  description,
  price,
  category,
  subCategory,
  image,
  stock
) => {
  try {
    const response = await axios.post(
      "/api/admin/add-product",
      {
        productName,
        description,
        price,
        category,
        subCategory,
        image,
        stock,
      },
      { headers: headerObject() }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
