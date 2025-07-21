import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin, googleUserLogin } from "../../services/userService";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userObject = { email, password };
      const response = await userLogin(userObject);
      console.log(response);
      Cookies.set("authToken", response.authToken, { expires: 7 });
      // Assuming the backend response is { authToken, data: { user } }
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login Failed");
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  "auth/googleLogin",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await googleUserLogin({ token });
      Cookies.set("authToken", response.data.authToken, { expires: 7 });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Google Login Failed"
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(googleLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
