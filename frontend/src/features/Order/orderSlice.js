import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  cancelOrderById,
  createOrder,
  getOrderListByUserId,
} from "../../services/orderService";

export const fetchCreateOrder = createAsyncThunk(
  "order/createOrder",
  async (grandTotal, { rejectWithValue }) => {
    try {
      const response = await createOrder({ grandTotal });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Create order has failed"
      );
    }
  }
);

export const fetchOrderList = createAsyncThunk(
  "order/orderList",
  async (userId, { rejectWithValue }) => {
    try {
      const repsonse = await getOrderListByUserId(userId);
      console.log(repsonse);
      return repsonse.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Get order list has failed"
      );
    }
  }
);

export const fetchCancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await cancelOrderById(userId, orderId);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Cancel order has failed"
      );
    }
  }
);

const initialState = {
  orderList: [],
  selectedItems: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedItems(state, action) {
      state.selectedItems = [...state.selectedItems, action.payload];
    },
    setNewList(state, action) {
      state.selectedItems = action.payload;
    },
    setClearList(state) {
      state.selectedItems = [];
    },
    setExistingCartList(state, action) {
      state.selectedItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    const commonPending = (state) => {
      state.selectedItems = [];
      state.loading = true;
      state.error = null;
    };
    const commonRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    builder
      .addCase(fetchCreateOrder.pending, commonPending)
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.orderList = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchCreateOrder.rejected, commonRejected)
      .addCase(fetchOrderList.pending, commonPending)
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        state.orderList = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchOrderList.rejected, commonRejected)
      .addCase(fetchCancelOrder.pending, commonPending)
      .addCase(fetchCancelOrder.fulfilled, (state, action) => {
        state.orderList = state.orderList.filter(
          (order) => order._id !== action.payload.data._id
        );
        state.loading = false;
      })
      .addCase(fetchCancelOrder.rejected, commonRejected);
  },
});

export const {
  setSelectedItems,
  setNewList,
  setClearList,
  setExistingCartList,
} = orderSlice.actions;
export default orderSlice.reducer;
