import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  getCartById,
  deleteCartItemById,
  updateCartItemQuantity,
} from "../../services/cartService";

export const fetchAddToCart = createAsyncThunk(
  "product/addToCart",
  async (productObject, { rejectWithValue }) => {
    try {
      const response = await addToCart(productObject);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Add to cart failed"
      );
    }
  }
);

export const fetchGetCartById = createAsyncThunk(
  "cart/getCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getCartById(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get cart items"
      );
    }
  }
);

export const fetchDeleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await deleteCartItemById(cartId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cart item"
      );
    }
  }
);

export const fetchUpdateQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ cartId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartItemQuantity(cartId, quantity);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  }
);

const initialState = {
  existingCartList: [],
  productId: null,
  quantity: 1,
  size: "S",
  totalPrice: null,
  loading: false,
  error: null,
  noOfItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setExistingCartList(state, action) {
      state.existingCartList = action.payload;
    },
    setProductId(state, action) {
      state.productId = action.payload;
    },
    incQuantity(state) {
      state.quantity += 1;
    },
    decQuantity(state) {
      if (state.quantity > 1) {
        state.quantity -= 1;
      }
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    setNoOfItems(state, action) {
      state.noOfItems = action.payload;
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
      .addCase(fetchAddToCart.pending, commonPending)
      .addCase(fetchAddToCart.fulfilled, (state, action) => {
        state.existingCartList = [
          ...state.existingCartList,
          ...action.payload.data,
        ];
        state.loading = false;
      })
      .addCase(fetchAddToCart.rejected, commonRejected)

      .addCase(fetchGetCartById.pending, commonPending)
      .addCase(fetchGetCartById.fulfilled, (state, action) => {
        state.existingCartList = action.payload.data;
        state.loading = false;
        state.noOfItems = action.payload.data.length;
      })
      .addCase(fetchGetCartById.rejected, commonRejected)

      .addCase(fetchDeleteCartItem.pending, commonPending)
      .addCase(fetchDeleteCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchDeleteCartItem.rejected, commonRejected)

      // .addCase(fetchUpdateQuantity.pending, commonPending)
      .addCase(fetchUpdateQuantity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUpdateQuantity.rejected, commonRejected);
  },
});

export const { setProductId, incQuantity, decQuantity, setSize, setNoOfItems } =
  cartSlice.actions;
export default cartSlice.reducer;
