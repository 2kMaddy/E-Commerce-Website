import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      const item = action.payload;
      const existing = state.cartList.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.cartList.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    removeFromCart(state, action) {
      state.cartList = state.cartList.filter((i) => i.id !== action.payload);
    },
    clearCart(state) {
      state.cartList = [];
    },
    updateCartQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartList.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addTocart, removeFromCart, clearCart, updateCartQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
