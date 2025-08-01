import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  userLogin,
  googleUserLogin,
  userRegistration,
  getUserInfo,
} from "../../services/userService";
import Cookies from "js-cookie";

const saveDetailsToLocal = (data) => {
  if (data.authToken) {
    Cookies.set("authToken", data.authToken, { expires: 7 });
  }
  localStorage.setItem("userProfileDetails", JSON.stringify(data.data));
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userObject = { email, password };
      const response = await userLogin(userObject);
      saveDetailsToLocal(response.data);
      // Assuming the backend response is { authToken, data: { user } }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login Failed");
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userObject = { name, email, password };
      const response = await userRegistration(userObject);
      saveDetailsToLocal(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup Failed");
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  "auth/googleLogin",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await googleUserLogin({ token });
      saveDetailsToLocal(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Google Login Failed"
      );
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "user/getUserDetail",
  async (_, { rejectWithValue }) => {
    try {
      const userDetail = localStorage.getItem("userProfileDetails");
      const parsedUser = JSON.parse(userDetail);
      const userId = parsedUser._id;
      const response = await getUserInfo(userId);
      saveDetailsToLocal(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch user info failed"
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
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
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
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
