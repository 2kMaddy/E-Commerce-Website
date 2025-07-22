import api from "./api";

export const userRegistration = (userObject) =>
  api.post("/user/register", userObject);

export const userLogin = (userObject) => api.post("/user/login", userObject);

export const googleUserLogin = (googleData) =>
  api.post("/user/google-login", googleData);

export const getUserInfo = (userId) => api.get(`/user/user-info/${userId}`);

export const updateUserProfile = (userId, updatedValues) =>
  api.put(`/user/update-user-profile/${userId}`, updatedValues);

export const deleteUser = (userId) => api.delete(`/user/delete-user/${userId}`);

export const forgotPassword = (email) =>
  api.post("/user/forgot-password", email);

export const resetPassword = (resetData) =>
  api.post("/user/reset-password", resetData);
