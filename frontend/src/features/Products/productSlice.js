import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLatestProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  addReviewToProduct,
} from "../../services/productService";

export const fetchLatestProducts = createAsyncThunk(
  "products/latestProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLatestProduct();
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching latest products failed"
      );
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/getProducts",
  async ({ page, sortBy, searchQuery }, { rejectWithValue }) => {
    try {
      const response = await getAllProducts(page, sortBy, searchQuery);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching products failed"
      );
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/byCategory",
  async ({ page, category }, { rejectWithValue }) => {
    try {
      const response = await getProductsByCategory(page, category);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching products by category failed"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/getProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getProductById(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching product failed"
      );
    }
  }
);

export const fetchAddReview = createAsyncThunk(
  "product/addReview",
  async ({ productId, review }, { rejectWithValue }) => {
    try {
      const response = await addReviewToProduct(productId, review);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Adding review failed"
      );
    }
  }
);

const initialState = {
  products: [],
  selectedProduct: null,
  productDetail: {},
  loading: false,
  error: null,
  totalPage: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
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
      .addCase(fetchLatestProducts.pending, commonPending)
      .addCase(fetchLatestProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchLatestProducts.rejected, commonRejected)

      .addCase(fetchProducts.pending, commonPending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.loading = false;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, commonRejected)

      .addCase(fetchProductsByCategory.pending, commonPending)
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.loading = false;
        state.totalPage = action.payload.totalPages;
      })
      .addCase(fetchProductsByCategory.rejected, commonRejected)

      .addCase(fetchProductById.pending, commonPending)
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productDetail = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, commonRejected)

      .addCase(fetchAddReview.pending, commonPending)
      .addCase(fetchAddReview.fulfilled, (state, action) => {
        state.loading = false;
        state.payload = action.payload;
      })
      .addCase(fetchAddReview.rejected, commonRejected);
  },
});

export const { setSelectedProduct, clearSelectedProduct } =
  productSlice.actions;
export default productSlice.reducer;
