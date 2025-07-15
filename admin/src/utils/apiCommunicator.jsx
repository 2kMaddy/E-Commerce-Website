import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

const headerObject = () => {
  const authToken = Cookies.get("adminToken");
  if (!authToken) return {};
  return {
    Authorization: `Bearer ${authToken}`,
  };
};

const handleApiError = (error) => {
  console.log(error.response.data);
  if (error.response && error.response.data) {
    return error.response.data;
  }
  return { success: false, message: "Network error" };
};

export const adminLoginSubmit = async (email, password) => {
  try {
    const response = await api.post("/admin/admin-login", {
      email,
      password,
      role: "admin",
    });
    if (response.data && response.data.authToken) {
      Cookies.set("adminToken", response.data.authToken, { expires: 7 });
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get("/admin/get-all-users", {
      headers: headerObject(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/admin/get-user/${userId}`, {
      headers: headerObject(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteUserById = async (userId) => {
  try {
    const response = await api.delete(`/admin/delete-user/${userId}`, {
      headers: headerObject(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await api.get("/admin/get-all-orders", {
      headers: headerObject(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.post(
      "/admin/update-order-status",
      {
        orderId,
        status,
      },
      { headers: headerObject() }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const adminRegistration = async (
  email,
  name,
  password,
  role = "admin"
) => {
  try {
    const response = await api.post("/admin/admin-registration", {
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
    return handleApiError(error);
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
    const response = await api.post(
      "/admin/add-product",
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
    return handleApiError(error);
  }
};

export const updateProductById = async (productId, updatedValues) => {
  try {
    const payload = {};
    const allowedFields = [
      "productName",
      "description",
      "price",
      "category",
      "subCategory",
      "stock",
    ];
    allowedFields.forEach((field) => {
      if (updatedValues[field] !== undefined) {
        payload[field] = updatedValues[field];
      }
    });

    const response = await api.post(
      `/admin/update-product/${productId}`,
      payload,
      { headers: headerObject() }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteProductById = async (productId) => {
  try {
    const response = await api.delete(`/admin/delete-product/${productId}`, {
      headers: headerObject(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateUserInfo = async (userId, updatedValues) => {
  try {
    const payload = {};
    const allowedFields = [
      "name",
      "email",
      "phone",
      "addressId",
      "updatedAddress",
    ];
    allowedFields.forEach((fileds) => {
      if (updatedValues[fileds] !== undefined) {
        payload[fileds] = updatedValues[fileds];
      }
    });
    const response = await api.post(
      `/admin/update-user-profile/${userId}`,
      payload,
      {
        headers: headerObject(),
      }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get("/product/get-product/", {
      headers: headerObject(),
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getOrderById = async (userId, orderId) => {
  try {
    const response = await api.get(
      `/order/get-order-by-id/${userId}/${orderId}`,
      {
        headers: headerObject(),
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
