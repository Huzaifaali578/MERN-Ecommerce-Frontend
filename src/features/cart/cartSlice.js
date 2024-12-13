import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchItemByUserId, removeFromCart, resetCart, updateCart } from "./CartAPI"

const initialState = {
  items: [],
  status: "idle",
  cartItemCheck : false
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (userCartData) => {
    const response = await addToCart(userCartData);
    console.log("response.data:", response.data);
    return response.data;
  }
);

export const fetchItemByUserIdAsync = createAsyncThunk(
  'cart/fetchItemByUserId',
  async () => {
    const response = await fetchItemByUserId();
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId) => {
    const response = await removeFromCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    return response.data;
  }
);



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload)
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartItemCheck = true;
      })
      .addCase(fetchItemByUserIdAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.cartItemCheck = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(removeFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        
        if (index !== -1) {
          // Remove the item from the array
          state.items.splice(index, 1);
        }
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []
      })
  },
});



export const cartSelector = (state) => state.cart.items;
export const cartItemCheckSelector = (state) => state.cart.cartItemCheck;

const cartReducer = cartSlice.reducer;
export default cartReducer;
