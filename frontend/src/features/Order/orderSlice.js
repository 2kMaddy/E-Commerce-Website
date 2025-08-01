import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../../services/orderService";

export const fetchCreateOrder = createAsyncThunk(
  "order/createOrder",
  async (orderObject, { rejectWithValue }) => {
    try {
      const response = await createOrder(orderObject);
      console.log("Create order status", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Create order has failed"
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
  },
  extraReducers: (builder) => {
    const commonPending = (state) => {
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
      .addCase(fetchCreateOrder.rejected, commonRejected);
  },
});

export const { setSelectedItems, setNewList, setClearList } =
  orderSlice.actions;
export default orderSlice.reducer;
